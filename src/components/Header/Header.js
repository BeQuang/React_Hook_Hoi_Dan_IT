import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import "./Header.scss";
import { postLogout } from "../../services/authService";
import { doLogout } from "../../redux/action/userAction";
import Languages from "../Languages/Languages";
import Profile from "../Profile/Profile";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogOut = async () => {
    const res = await postLogout(account.email, account.refresh_token);

    if (res && res.EC === 0) {
      // clear data redux
      dispatch(doLogout());
      navigate("/login");
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          {/* <Navbar.Brand href="#home">Quiz LOL</Navbar.Brand> */}
          <NavLink to="/" className="navbar-brand">
            Quiz LOL
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/" className="nav-link">
                {t("homepage.header.navLinkHome")}
              </NavLink>
              <NavLink to="/users" className="nav-link">
                {t("homepage.header.navLinkUser")}
              </NavLink>
              <NavLink to="/admins" className="nav-link">
                {t("homepage.header.navLinkAdmin")}
              </NavLink>
            </Nav>
            <Nav>
              {isAuthenticated === false ? (
                <>
                  <button className="btn-login" onClick={() => handleLogin()}>
                    {t("homepage.header.buttonLogin")}
                  </button>
                  <button
                    className="btn-signup"
                    onClick={() => handleRegister()}
                  >
                    {t("homepage.header.buttonSingUp")}
                  </button>
                </>
              ) : (
                <NavDropdown
                  title={t("homepage.header.buttonSettings")}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item onClick={() => setShow(true)}>
                    {t("homepage.header.itemProfile")}
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => handleLogOut()}>
                    {t("homepage.header.itemLogout")}
                  </NavDropdown.Item>
                </NavDropdown>
              )}

              <Languages />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Profile show={show} setShow={setShow} />
    </>
  );
};

export default Header;
