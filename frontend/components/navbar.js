import "../styles/navbar.css";
import { FaBook } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { auth } from "../store";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.isLogin);

  const logOutHandler = () => {
    sessionStorage.clear();
    dispatch(auth.logOut());

    toast.success("LogOut successful !!!");
  };

  return (
    <div className="navbar">
      <div className="logo">
        <FaBook /> &nbsp; <b>todo</b>
      </div>
      <div style={{ flex: 5 }}></div>
      <div style={{ flex: 3 }}>
        <ul className="items">
          <Link to="/">
            {" "}
            <li>Home</li>
          </Link>
          <Link to="/todo">
            {" "}
            <li>Todo</li>
          </Link>
          {isLogin ? (
            <button onClick={logOutHandler}>Logout</button>
          ) : (
            <>
              <Link to="/signIn">
                {" "}
                <button>SignIn</button>
              </Link>
              <Link to="/signUp">
                {" "}
                <button>SignUp</button>
              </Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
