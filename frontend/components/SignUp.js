import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom';

const SignUp = () => {
 const navigate = useNavigate();
  const [inputs, setInputs] = useState({ email: '', username: '', password: '' });
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/v1/register', inputs);
      console.log(response);
      alert(response.data.message)
      setInputs({ email: '', username: '', password: '' });
      navigate('/signIn')
    
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
        <input type="email" name="email" placeholder="Email" value={inputs.email} onChange={handleInputChange} required />
        <input type="text" name="username" placeholder="Username" value={inputs.username} onChange={handleInputChange} required />
        <input type="password" name="password" placeholder="Password" value={inputs.password} onChange={handleInputChange} required />
        <button type="submit" onClick={handleSubmit}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
