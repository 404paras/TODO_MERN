import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch} from 'react-redux';
import {auth} from '../store'; 
import {useNavigate} from 'react-router-dom';



const SignIn = () => {
 const navigate = useNavigate();
  const [inputs, setInputs] = useState({  username: '', password: '' });
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/v1/login', inputs);
      console.log(response);
      sessionStorage.setItem("id",response.data.id);
      dispatch(auth.login())
      alert(response.data.message)
      setInputs({ username: '', password: '' });
      navigate('/')
    
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  return (
    <div>
        <ToastContainer/>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={inputs.username} onChange={handleInputChange} required />
        <input type="password" name="password" placeholder="Password" value={inputs.password} onChange={handleInputChange} required />
        <button type="submit" onClick={handleSubmit}>Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
