import '../styles/navbar.css';
import { FaBook } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo" ><FaBook/> &nbsp; <b>todo</b></div>
      <div style={{flex:4}}></div>
      <div style={{flex:4}}>
        <ul className="items">
          <li>Home</li>
          <li>About Us</li>
          <button>SignIn</button>
          <button>SignUp</button>
          <button>Logout</button>
          <li><FaRegCircleUser/></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
