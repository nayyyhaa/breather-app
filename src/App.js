import { useEffect, useState } from "react";
import './App.css';
import playImg from './assets/svg/play.svg';
import pauseImg from './assets/svg/pause.svg';
import rainImg from './assets/svg/rain.svg';
import beachImg from './assets/svg/beach.svg';
import rainAudio from './assets/sounds/rain.mp3';
import beachAudio from './assets/sounds/beach.mp3';

export default function App() {
  let [time, setTime] = useState();
  let [date, setDate] = useState();
  let [duration, setDuration] = useState(120);
  let [timer, setTimer] = useState(0);
  let [seconds, setSeconds] = useState('00');
  let [minutes, setMinutes] = useState(2);
  let [sound, setSound] = useState(new Audio(rainAudio));
  let [playing, setPlaying] = useState(false);
  let [track, setTrack] = useState("Rainy!");

  let todayTime = () => {
    setInterval(updateTodaysTime,1000);
  }

  let updateTodaysTime = () => {
    let today = new Date();
    let currDate = today.toLocaleDateString();
    let currtime =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    setDate(currDate);
    setTime(currtime);
  };

  const toggle = () => setPlaying(!playing);

   useEffect(() => {
      if(playing) { 
        sound.play();
        Array.from(document.querySelectorAll('.sound-btn')).map( btn => btn.classList.add('-disabled'));
        Array.from(document.querySelectorAll('.duration-btn')).map( btn => btn.classList.add('-disabled'));
        document.querySelector('.play').src = pauseImg;
      }
      else {
        sound.pause();
        Array.from(document.querySelectorAll('.sound-btn')).map( btn => btn.classList.remove('-disabled'));
        Array.from(document.querySelectorAll('.duration-btn')).map( btn => btn.classList.remove('-disabled'));
        document.querySelector('.play').src = playImg;
      };
    },
    [playing]
  );

  useEffect(() => {
    sound.addEventListener('ended', () => setPlaying(false));
    return () => {
    sound.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  useEffect(() => {
    if(duration == timer) {
      setPlaying(false);
      resetTimer();
    }
  },[timer])

  let resetTimer = () => {
      setTimer(0);
      setSeconds('00');
      setMinutes(0);
      sound.currentTime = 0;
      updateProgressBar();
  }

  let updateProgressBar = () => {
    const outline = document.querySelector(".moving-outline circle");
    const outlineLength = outline.getTotalLength();
    outline.style.strokeDashoffset = outlineLength;
    outline.style.strokeDasharray = outlineLength;
    let currentTime = sound.currentTime;
    let progress = outlineLength - (currentTime / duration) * outlineLength;
    outline.style.strokeDashoffset = progress;
  }

  let updateTimer = () => {
    setTimer(prevTimer => timer = prevTimer + 1)
    let currentTime = sound.currentTime;
    updateProgressBar();
    let elapsed = duration - currentTime;
    setSeconds(Math.floor(elapsed % 60));
    setMinutes(Math.floor(elapsed / 60));
  }

  useEffect(() => {
    let updateInterval;
    if(playing) { updateInterval = setInterval(() => updateTimer(),1000);}
    return () => clearInterval(updateInterval);
  }, [playing]);

  useEffect(todayTime,[]);

  return (
    <div className="App">
      <header>
        <div className="app_title">
          <h1>Breather App!</h1>
          <h5>your meditation buddy</h5>
        </div>
        <h3>Today: {date}, {time}</h3>
      </header>
      <main className="App-content">
        <div className="duration-content">
          <h2>Duration</h2>
          <h4 className="selected_duration">Selected Duration: {duration / 60} minutes.</h4>
          <button className="duration-btn" onClick={(e) => {
            setDuration(120);
            resetTimer();
          }}>2 minutes</button>
          <button className="duration-btn" onClick={(e) => {
            setDuration(300);
            resetTimer();
          }}>5 minutes</button>
          <button className="duration-btn" onClick={(e) => {
            setDuration(600);
            resetTimer();
          }}>10 minutes</button>
        </div>
        <div className="timer-content">
          <audio className="audio">
            <source src="./assets/sounds/rain.mp3"></source>
          </audio>
          <img src={playImg} alt="play" className="play" onClick={toggle}></img>
          <svg className="track-outline" width="453" height="453" viewBox="0 0 453 453" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="226.5" cy="226.5" r="216.5" stroke="white" strokeWidth="20"/>
          </svg>

          <svg className="moving-outline" width="453" height="453" viewBox="0 0 453 453" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="226.5" cy="226.5" r="216.5" stroke="#018EBA" strokeWidth="20"/>
          </svg>

          <h1 className="timer">{minutes}:{(seconds<10 && seconds>0)? '0'+seconds: seconds}</h1>
        </div>
        <div className="sound-content">
          <h2>Tracks</h2>
          <h4 className="selected_track">Selected Track: {track}</h4>
          <button className="sound-btn" onClick={() => {
            setSound(prevAudio => prevAudio = new Audio(rainAudio));
            resetTimer();
            setTrack("Rainy!");
          }}>
            <img src={rainImg} alt="rain" className="rain-img"></img>
          </button>
          <button className="sound-btn" onClick={() => {
            setSound(prevAudio => prevAudio = new Audio(beachAudio));
            resetTimer();
            setTrack("Beach Vibes!");
          }}>
            <img src={beachImg} alt="beach" className="beach-img"></img>
          </button>
        </div>
      </main>
    </div>
  );
}
          