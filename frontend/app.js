import React from "react";
import ReactDOM from "react-dom";
import Navbar from './components/navbar'
import './app.css';
import Home from "./components/Home";

import Footer from "./components/Footer";
import {BrowserRouter as Router , Routes , Route} from "react-router-dom";
import Todo from "./components/Todo.js";


const App = () => {
    return (
        <Router>
          <Navbar/>
          <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/todo" element={<Todo/>}/>
          </Routes>
          <Footer/>

        </Router>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
