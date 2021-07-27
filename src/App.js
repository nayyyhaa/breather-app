import { useEffect, useState } from "react";
import './App.css';
import playImg from './assets/svg/play.svg';
import rainImg from './assets/svg/rain.svg';
import beachImg from './assets/svg/beach.svg';

export default function App() {
  let [time, setTime] = useState();
  let [date, setDate] = useState();
  let [duration, setDuration] = useState(0);
  let [timer, setTimer] = useState(0);
  let [sound, setSound] = useState('./assets/sounds/rain.mp3');
  let todayTime = () => {
    setInterval(updateTimer,1000);
  }
  let updateTimer = () => {
    let today = new Date();
    let currDate = today.toLocaleDateString();
    let currtime =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    setDate(currDate);
    setTime(currtime);
  };
  useEffect(todayTime,[]);
  return (
    <div className="App">
      <header>
        <h1>Meditation App</h1>
        <h3>Today: {date}, {time}</h3>
      </header>
      <main className="App-content">
        <div className="duration-content">
          <h2>Duration</h2>
          <button onClick={() => {
            setDuration(2)
          }}>2 minutes</button>
          <button onClick={() => {
            setDuration(5)
          }}>5 minutes</button>
          <button onClick={() => {
            setDuration(10)
          }}>10 minutes</button>
        </div>
        <div className="timer-content">
          <audio className="audio">
            <source src="./assets/sounds/rain.mp3"></source>
          </audio>
          <img src={playImg} alt="play" className="play"></img>
          <svg className="track-outline" width="453" height="453" viewBox="0 0 453 453" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="226.5" cy="226.5" r="216.5" stroke="white" stroke-width="20"/>
          </svg>

          <svg className="moving-outline" width="453" height="453" viewBox="0 0 453 453" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="226.5" cy="226.5" r="216.5" stroke="#018EBA" stroke-width="20"/>
          </svg>

          <h1 className="timer">{timer}</h1>
        </div>
        <div className="sound-content">
          <h2>Tracks</h2>
          <button onClick={() => {
            setSound('./assets/sounds/rain.mp3')
          }}>
            <img src={rainImg} alt="rain" className="rain-img"></img>
          </button>
          <button onClick={() => {
            setSound('./assets/sounds/beach.mp3')
          }}>
            <img src={beachImg} alt="beach" className="beach-img"></img>
          </button>
        </div>
      </main>
    </div>
  );
}
          