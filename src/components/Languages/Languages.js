import NavDropdown from "react-bootstrap/NavDropdown";

import "./Languages.scss";

function Languages() {
  return (
    <>
      <NavDropdown
        title="Languages"
        id="basic-nav-dropdown"
        className="language"
      >
        <NavDropdown.Item>English</NavDropdown.Item>
        <NavDropdown.Item>Vietnamese</NavDropdown.Item>
      </NavDropdown>
    </>
  );
}

export default Languages;
