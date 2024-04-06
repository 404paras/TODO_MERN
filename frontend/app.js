import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import Navbar from './components/navbar'
import './app.css';
import Home from "./components/Home";
import SignUp from "./components/SignUp.js";
import Footer from "./components/Footer";
import {BrowserRouter as Router , Routes , Route} from "react-router-dom";
import Todo from "./components/Todo.js";
import SignIn from './components/SignIn.js'
import {Provider} from 'react-redux';
import {store} from './store/index.js'
import {useDispatch} from 'react-redux';
import {auth} from './store';

const App = () => {
const dispatch = useDispatch();
useEffect(()=>{
  const id  = sessionStorage.getItem('id');
  if(id){
    dispatch(auth.login())
  }
})


    return (
        <Router>
         
          <Navbar/>
          
          <Routes>
       
          <Route path="/" element={<Home/>}/>
          <Route path="/todo" element={<Todo/>}/>
          <Route path='/signUp' element={<SignUp/>}/>
          <Route path='/signIn' element={<SignIn/>}/>
          </Routes>
          
          <Footer/>

        </Router>
    );
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
