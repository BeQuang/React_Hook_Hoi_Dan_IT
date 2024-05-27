import { useState, useEffect } from "react";
import { secondsToHHMMSS } from "../Convert/Convert";

function Countdown({ onTimeUp }) {
  const [duration, setDuration] = useState(5400);

  useEffect(() => {
    if (duration === 0) {
      onTimeUp();
      return;
    }
    const timer = setInterval(() => {
      setDuration(duration - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration]);

  return <div className="time">{secondsToHHMMSS(duration)}</div>;
}

export default Countdown;
