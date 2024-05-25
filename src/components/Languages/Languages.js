import NavDropdown from "react-bootstrap/NavDropdown";
import { useTranslation } from "react-i18next";

import "./Languages.scss";

function Languages() {
  const { t, i18n } = useTranslation();

  const handleChangeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  return (
    <>
      <NavDropdown
        title={i18n.language === "en" ? "English" : "Việt Nam"}
        id="basic-nav-dropdown"
        className="language"
      >
        <NavDropdown.Item onClick={() => handleChangeLanguage("en")}>
          {t("homepage.header.itemEnglish")}
        </NavDropdown.Item>
        <NavDropdown.Item onClick={() => handleChangeLanguage("vi")}>
          {t("homepage.header.itemVietNamese")}
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );
}

export default Languages;
