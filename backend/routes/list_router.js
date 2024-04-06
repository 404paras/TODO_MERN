import { Router } from "express";
import { User } from '../models/user.js';
import { taskList } from '../models/tasks_list.js';

const userRouter = Router();

// Add a new task to a user's task list
userRouter.post('/addTask', async (req, res) => {
    console.log('Received POST request to /api/v2/addTask');
    try {
        const { title, id, body } = req.body;
        
        // Check if user exists
        const existingUser = await User.findById(id);
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create and save new task
        const newTask = new taskList({ title, body });
        newTask.user.push(existingUser);
        existingUser.tasks.push(newTask);
        await Promise.all([newTask.save(), existingUser.save()]);

        res.status(201).json({ message: 'Task added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Update an existing task
userRouter.put('/updateTask/:id', async (req, res) => {
    console.log('Received PUT request to /api/v2/updateTask');
    try {
        const { title, body, email } = req.body;
        const taskId = req.params.id;

        // Validate task ID
        if (!taskId) {
            return res.status(400).json({ message: 'Task ID is required' });
        }

        // Find user by email
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find task by ID and update
        const updatedTask = await taskList.findByIdAndUpdate(taskId, { title, body }, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task updated successfully', updatedTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Delete a task
userRouter.delete('/deleteTask/:id', async (req, res) => {
    console.log('Received delete request to /api/v2/deleteTask');
    try {
        const taskId = req.params.id;
        
        // Validate task ID
        if (!taskId) {
            return res.status(400).json({ message: 'Task ID is required' });
        }

        // Find task by ID and delete
        const deletedTask = await taskList.findByIdAndDelete(taskId);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Remove task ID from user's task list
        const taskUser = deletedTask.user[0].valueOf();
        const updatedUser = await User.findByIdAndUpdate(taskUser, { $pull: { tasks: taskId } }, { new: true });
        
        res.status(200).json({ message: 'Task Deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Get all tasks associated with a user
userRouter.get('/getAllTask/:id', async (req, res) => {
    try {
        const tasks = await taskList.find({ user: req.params.id }).sort({ createdAt: -1 });
        
        if (tasks.length > 0) {
            res.status(200).json({ message: tasks });
        } else {
            res.status(404).json({ message: 'No tasks found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default userRouter;
