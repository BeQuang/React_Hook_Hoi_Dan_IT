import { useState } from "react";
import "./Login.scss";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {};

  return (
    <div className="login">
      <div className="header">Don't have an account yet?</div>
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
      </div>
    </div>
  );
}

export default Login;
