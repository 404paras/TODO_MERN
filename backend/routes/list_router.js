import { taskList } from '../models/tasks_list.js';
import { Router } from "express";
import { User } from '../models/user.js';

const userRouter = new Router();

userRouter.post('/addTask', async (req, res) => {
    console.log('Received POST request to /api/v2/addTask');
    try {
        const { title, email, body } = req.body;
        
        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create and save new task
        const newList = new taskList({ title, body });
        newList.user.push(existingUser);
        existingUser.tasks.push(newList);
        await Promise.all([newList.save(), existingUser.save()]);

        res.status(201).json({ message: 'Task added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

userRouter.put('/updateTask/:id', async (req, res) => {
    console.log('Received PUT request to /api/v2/updateTask');
    try {
        const { title, body, email } = req.body;
        const taskId = req.params.id;

        // Validate task ID
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!taskId) {
            return res.status(400).json({ message: 'Task ID is required' });
        }

        // Find task by ID and update
        const updatedTask = await taskList.findByIdAndUpdate(taskId, { title, body }, { new: true });

        // Check if task exists
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task updated successfully', updatedTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

userRouter.delete('/deleteTask/:id', async (req, res) => {
    console.log('Received delete request to /api/v2/deleteTask');
    try {
        const { email } = req.body;
        const taskId = req.params.id;
        
        const existingUser = await User.findOneAndUpdate({ email }, { $pull: { tasks: taskId } });
        
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Validate task ID
        if (!taskId) {
            return res.status(400).json({ message: 'Task ID is required' });
        }

        // Find task by ID and delete
        const deletedTask = await taskList.findByIdAndDelete(taskId);

        // Check if task exists
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task Deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

userRouter.get('/getAllTask/:id',async(req,res)=>{
    try {
        const data = await taskList.find({ user: req.params.id }).sort({ createdAt: -1 });
        if (data.length > 0) {
            res.status(200).json({ message: data });
        } else {
            res.status(500).json({ message: 'No task exists' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default userRouter;
