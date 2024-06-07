import { Link } from "react-router-dom";
import "../css/main.css";
import "../css/login-register.css";
import { ChangeEvent, FormEvent, useState } from "react";

const Register = () => {
  const [name, setName] = useState<string>();
  const [password, setPassword] = useState<string>();

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const handlePasswordeChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="login-register-bg">
      <form className="form-container" onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div className="input-box">
          <input type="text" name="secret_key" placeholder="Enter Secret Key" />
        </div>
        <div className="input-box">
          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            autoComplete="name"
            onChange={handleNameChange}
          />
        </div>
        <div className="input-box">
          <input
            type="text"
            name="password"
            placeholder="Enter Password"
            onChange={handlePasswordeChange}
          />
        </div>
        <div className="input-box">
          <input type="text" name="password" placeholder="Confirm Password" />
        </div>
        <button className="btn" type="submit">
          Register
        </button>
        <Link to="/admin/login" className="nav-link">
          Login
        </Link>
      </form>
    </div>
  );
};

export default Register;
