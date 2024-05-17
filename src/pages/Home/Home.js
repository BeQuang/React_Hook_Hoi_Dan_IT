import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./Home.scss";
import videoHome from "../../assets/video/video-homepage.webm";

function Home() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="video-container">
        <video autoPlay muted loop className="video">
          <source src={videoHome} type="video/webm" />
        </video>
      </div>

      <div className="home-content">
        <h3 className="title-home">Feel free to explore</h3>
        <p className="description-home">
          Interesting questions about generals, equipment even top matches
          around the world. Timely capture the meta so that you and your friends
          can have more emotional games.
        </p>
        <div>
          {isAuthenticated === false ? (
            <button className="btn-start" onClick={() => navigate("/login")}>
              Get's start. It's free
            </button>
          ) : (
            <button className="btn-start" onClick={() => navigate("/users")}>
              Doing With Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
