import React, { useState, useEffect } from "react";
import "./Reminder.css";
const Reminder = () => {
  const [text, setText] = useState("");
  const [reminder, setAllRemainder] = useState();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [loading, setLoading] = useState(false);
  // To get Text value
  const textValue = (e) => {
    setText(e.target.value);
  };

  // To get Date And Time value
  const dateValue = (e) => {
    setDate(e.target.value);
  };
  const timeValue = (e) => {
    setTime(e.target.value);
  };

  //   To Submite all value
  const noteInfo = () => {
    const reminderInfo = { text, date, time };
    fetch(`http://localhost:4000/api/remainder`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(reminderInfo),
    })
      .then((res) => res.json())
      .then((result) => {
        alert("added");
        console.log(result);
      });
  };

  // To get all reminder
  useEffect(() => {
    fetch("http://localhost:4000/api/remainder")
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          setAllRemainder(result);
          setLoading(false);
        } else {
          setLoading(true);
        }
      });
  }, [reminder]);

  return (
    <div className="reminder-container">
      <h2>Reminder App</h2>
      <div className="input-field">
        <input type="text" onBlur={textValue} placeholder="Take Notes" />
        <input type="date" onBlur={dateValue} />
        <input type="datetime" name="" onBlur={timeValue} />
        <button onClick={noteInfo}>Remind Me</button>
      </div>
      <div>
        {loading ? (
          <small>Loading</small>
        ) : (
          <ul>
            {reminder &&
              reminder.map((remin) => (
                <li key={remin._id} className="reminder-list">
                  {remin.text} |<small>{remin.time}</small>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Reminder;
