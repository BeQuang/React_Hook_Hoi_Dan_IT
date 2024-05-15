import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaMicrosoft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { SiRiotgames } from "react-icons/si";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Register.scss";
import videoRegister from "../../assets/video/register-LOL.mp4";
import { postRegister } from "../../services/userService";
import {
  validateEmail,
  validatePassword,
  validateEmpty,
} from "../Validate/Validate.js";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    // validate
    if (!validateEmail(email)) {
      toast.error("Invalid email");
      return;
    } else if (!validatePassword(password)) {
      toast.error(
        "Password of at least 6 characters including numbers and capital characters"
      );
      return;
    } else if (!validateEmpty(username)) {
      toast.error("Please enter the username field");
      return;
    }

    let data = await postRegister(email, password, username);
    console.log(data);

    if (data && data.EC === 0) {
      toast.success(`${data.EM}. Sign in with the account you just created`);
      setEmail("");
      setPassword("");
      setUsername("");
      navigate("/login");
    } else {
      toast.error(data.EM);
    }
  };

  const handleSwitchPageLogin = () => {
    navigate("/login");
  };

  const handleSwitchPageHome = () => {
    navigate("/");
  };

  return (
    <div className="register">
      <div className="register-info">
        <div className="title">
          Sign up <br />
          and come on in
        </div>
        <video autoPlay muted loop className="video">
          <source src={videoRegister} type="video/mp4" />
        </video>
        <div className="footer">
          <SiRiotgames />
          <span>Riot game</span>
        </div>
      </div>
      <div className="register-form">
        <div className="header">
          <span>Already have an account?</span>
          <button
            className="btn-sign-in"
            onClick={() => handleSwitchPageLogin()}
          >
            Log in
          </button>
        </div>
        <div className="title col-4 mx-auto">Quiz LOL</div>
        <div className="welcome col-4 mx-auto">
          Get better data with conversational forms, surveys,
          <br /> quizzes & more.
        </div>
        <div className="form col-4 mx-auto">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <button className="btn-login" onClick={() => handleRegister()}>
              Sign up Quiz LOL
            </button>
          </div>
          <div className="line"></div>
          <div className="different">
            <button className="btn-different google">
              <FcGoogle /> <span>Sign up with Google</span>
            </button>
            <button className="btn-different microsoft">
              <FaMicrosoft /> <span>Sign up with Microsoft</span>
            </button>
          </div>
          <div className="back-home" onClick={() => handleSwitchPageHome()}>
            &#60;&#60; Go to back Home
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
