import React from "react";
import "../styles/home.css";
import {Link} from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <h1>Make your todo list now!!!</h1>
      <Link to={'/todo'}><button>Click here </button></Link>
    </div>
  );
};

export default Home;
