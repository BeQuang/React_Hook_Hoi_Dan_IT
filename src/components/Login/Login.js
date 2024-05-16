import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaMicrosoft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import "./Login.scss";
import { postLogin } from "../../services/userService.js";
import { validateEmail, validatePassword } from "../Validate/Validate.js";
import { doLogin } from "../../redux/action/userAction.js";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    // validate
    if (!validateEmail(email)) {
      toast.error("Invalid email");
      return;
    } else if (!validatePassword(password)) {
      toast.error("Incorrect password");
      return;
    }

    let data = await postLogin(email, password);
    if (data && data.EC === 0) {
      dispatch(doLogin(data));
      toast.success(data.EM);
      navigate("/");
    } else {
      toast.error(data.EM);
    }
  };

  const handleSwitchPageSingIn = () => {
    navigate("/register");
  };

  const handleSwitchPageHome = () => {
    navigate("/");
  };

  return (
    <div className="login">
      <div className="header">
        <span>Don't have an account yet?</span>
        <button
          className="btn-sign-in"
          onClick={() => handleSwitchPageSingIn()}
        >
          Sign in
        </button>
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
        <div className="back-home" onClick={() => handleSwitchPageHome()}>
          &#60;&#60; Go to back Home
        </div>
      </div>
    </div>
  );
}

export default Login;
