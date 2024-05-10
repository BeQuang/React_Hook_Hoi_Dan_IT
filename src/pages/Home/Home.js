import videoHome from "../../assets/video/video-homepage.webm";
import "./Home.scss";

function Home() {
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
          <button className="btn-start">Get's start. It's free</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
