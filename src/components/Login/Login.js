import { useState } from "react";
import "./Login.scss";
import { FcGoogle } from "react-icons/fc";
import { FaMicrosoft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/userService.js";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    // validate

    let data = await postLogin(email, password);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      navigate("/");
    } else {
      toast.error(data.EM);
    }
  };

  return (
    <div className="login">
      <div className="header">
        <span>Don't have an account yet?</span>
        <button className="btn-sign-in">Sign in</button>
      </div>
      <div className="title col-4 mx-auto">Quiz LOL</div>
      <div className="welcome col-4 mx-auto">Hello, who's this?</div>
      <div className="form col-4 mx-auto">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <span className="forgot">Forgot password?</span>
        <div>
          <button className="btn-login" onClick={() => handleLogin()}>
            Login to Quiz LOL
          </button>
        </div>
        <div className="line"></div>
        <div className="different">
          <button className="btn-different google">
            <FcGoogle /> <span>Login with Google</span>
          </button>
          <button className="btn-different microsoft">
            <FaMicrosoft /> <span>Login with Microsoft</span>
          </button>
        </div>
        <div
          className="back-home"
          onClick={() => {
            navigate("/");
          }}
        >
          &#60;&#60; Go to back Home
        </div>
      </div>
    </div>
  );
}

export default Login;
