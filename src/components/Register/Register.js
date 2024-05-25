import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaMicrosoft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { SiRiotgames } from "react-icons/si";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

import "./Register.scss";
import videoRegister from "../../assets/video/register-LOL.mp4";
import { postRegister } from "../../services/authService.js";
import {
  validateEmail,
  validatePassword,
  validateEmpty,
} from "../Validate/Validate.js";
import Languages from "../Languages/Languages.js";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

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
          {t("logout.titleAbove")} <br />
          {t("logout.titleBelow")}
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
          <span>{t("logout.span")}</span>
          <button
            className="btn-sign-in"
            onClick={() => handleSwitchPageLogin()}
          >
            {t("logout.btnLogin")}
          </button>
          <Languages />
        </div>
        <div className="title col-4 mx-auto">Quiz LOL</div>
        <div className="welcome col-4 mx-auto">
          {t("logout.welcomeAbove")}
          <br /> {t("logout.welcomeBelow")}
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
            <label>{t("logout.password")}</label>
            <input
              type="password"
              className="form-control"
              placeholder={t("logout.password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>{t("logout.username")}</label>
            <input
              type="text"
              className="form-control"
              placeholder={t("logout.username")}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <button className="btn-login" onClick={() => handleRegister()}>
              {t("logout.btnSignUp")}
            </button>
          </div>
          <div className="line"></div>
          <div className="different">
            <button className="btn-different google">
              <FcGoogle /> <span>{t("logout.SignUpGG")}</span>
            </button>
            <button className="btn-different microsoft">
              <FaMicrosoft /> <span>{t("logout.SignUpMS")}</span>
            </button>
          </div>
          <div className="back-home" onClick={() => handleSwitchPageHome()}>
            &#60;&#60; {t("logout.btnBack")}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
