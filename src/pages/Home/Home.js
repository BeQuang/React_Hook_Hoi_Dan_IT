import videoHome from "../../assets/video/video-homepage.webm";

function Home() {
  return (
    <div className="home-container">
      <div className="video-container">
        <video autoPlay muted loop className="video">
          <source src={videoHome} type="video/webm" />
        </video>
      </div>
    </div>
  );
}

export default Home;
