import { Link } from "react-router-dom";
import "../css/main.css";
import "../css/login-register.css";
import { FaUser } from "react-icons/fa6";
import { useState } from "react";
import { RiEyeCloseLine, RiEyeFill } from "react-icons/ri";

const Login = () => {
  const [isLocked, setIsLocked] = useState(true);

  const toggleLocked = () => {
    setIsLocked(!isLocked);
  };

  return (
    <div className="login-register-bg">
      <section className="login-form-container">
        <h1>Login</h1>
        <div className="input-box">
          <input type="text" name="username" placeholder="Enter Username" />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input
            type={isLocked ? "password" : "text"}
            name="password"
            placeholder="Enter Password"
          />
          {isLocked ? (
            <RiEyeCloseLine className="icon locked" onClick={toggleLocked} />
          ) : (
            <RiEyeFill className="icon unlocked" onClick={toggleLocked} />
          )}
        </div>
        <button className="btn" type="submit">
          Login
        </button>
        <Link to="/admin/register" className="nav-link">
          Register
        </Link>
      </section>
    </div>
  );
};

export default Login;
