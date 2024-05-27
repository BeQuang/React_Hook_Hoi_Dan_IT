import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "./Home.scss";
import videoHome from "../../assets/video/video-homepage.webm";

function Home() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="home-container">
      <div className="video-container">
        <video autoPlay muted loop className="video">
          <source src={videoHome} type="video/webm" />
        </video>
      </div>

      <div className="home-content">
        <h3 className="title-home">{t("homepage.title")}</h3>
        <p className="description-home">{t("homepage.description")}</p>
        <div>
          {isAuthenticated === false ? (
            <button className="btn-start" onClick={() => navigate("/login")}>
              {t("homepage.btn-start-login")}
            </button>
          ) : (
            <button className="btn-start" onClick={() => navigate("/users")}>
              {t("homepage.btn-start-user")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
