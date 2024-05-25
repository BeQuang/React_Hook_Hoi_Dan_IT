import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaMicrosoft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { ImSpinner } from "react-icons/im";
import { useTranslation } from "react-i18next";

import "./Login.scss";
import { postLogin } from "../../services/authService.js";
// import { validateEmail, validatePassword } from "../Validate/Validate.js";
import { validateEmail } from "../Validate/Validate.js";
import { doLogin } from "../../redux/action/userAction.js";
import Languages from "../Languages/Languages.js";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const handleLogin = async () => {
    // validate
    if (!validateEmail(email)) {
      toast.error("Invalid email");
      return;
    }
    // else if (!validatePassword(password)) {
    //   toast.error("Incorrect password");
    //   return;
    // }

    setIsLoading(true);
    let data = await postLogin(email, password);
    if (data && data.EC === 0) {
      dispatch(doLogin(data));
      toast.success(data.EM);
      setIsLoading(false);
      navigate("/");
    } else {
      toast.error(data.EM);
      setIsLoading(false);
    }
  };

  const handleSwitchPageSingIn = () => {
    navigate("/register");
  };

  const handleSwitchPageHome = () => {
    navigate("/");
  };

  const handleKeyDown = (e) => {
    if (e && e.keyCode === 13) {
      handleLogin();
    }
  };

  return (
    <div className="login">
      <div className="header">
        <span>{t("login.span")}</span>
        <button
          className="btn-sign-in"
          onClick={() => handleSwitchPageSingIn()}
        >
          {t("login.btnSignIn")}
        </button>
        <Languages />
      </div>
      <div className="title col-4 mx-auto">Quiz LOL</div>
      <div className="welcome col-4 mx-auto">{t("login.welcome")}</div>
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
          <label>{t("login.password")}</label>
          <input
            type="password"
            className="form-control"
            placeholder={t("login.password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
          />
        </div>
        <span className="forgot">{t("login.forgotPass")}</span>
        <div>
          <button
            className="btn-login"
            onClick={() => handleLogin()}
            disabled={isLoading}
          >
            {isLoading === true && <ImSpinner className="loader-icon" />}
            <span>{t("login.btnLogin")}</span>
          </button>
        </div>
        <div className="line"></div>
        <div className="different">
          <button className="btn-different google">
            <FcGoogle /> <span>{t("login.LoginGG")}</span>
          </button>
          <button className="btn-different microsoft">
            <FaMicrosoft /> <span>{t("login.LoginMS")}</span>
          </button>
        </div>
        <div className="back-home" onClick={() => handleSwitchPageHome()}>
          &#60;&#60; {t("login.btnBack")}
        </div>
      </div>
    </div>
  );
}

export default Login;
