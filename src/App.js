import { useEffect, useState } from "react";

export default function App() {
  let [time, setTime] = useState();
  let [date, setDate] = useState();

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
      <h2>Meditation App</h2>
  Today: {date}, {time}
      <button >Start Timer</button>
      
    </div>
  );
}
