import { Link } from "react-router-dom";
import "../css/main.css";
import "../css/login-register.css";
import { FaUser, FaLock } from "react-icons/fa6";

const Login = () => {
  return (
    <div className="login-register-bg">
      <section className="form-container">
        <h1>Login</h1>
        <div className="input-box">
          <input type="text" name="username" placeholder="Enter Username" />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input type="text" name="password" placeholder="Enter Password" />
          <FaLock className="icon" />
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
