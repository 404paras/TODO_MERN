import React from "react";
import ReactDOM from "react-dom";
import Navbar from './components/navbar'
import './app.css';
import Home from "./components/Home";
import Footer from "./components/Footer";



const App = () => {
    return (
        <div >
          <Navbar/>
          <Home/>
          <Footer/>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
