import React, { FC, useState, useCallback } from "react";
import "./App.css";

import Rect from "./Rect";

type AppProps = {
  title: string;
  message: string;
};

const App: FC = () => {
  return (
    <div className="container">
      <h1>React</h1>
      <Rect x="50" y="50" w="150" h="150" c="#6ff9" r="50" />
      <Rect x="150" y="100" w="150" h="150" c="#f6f9" r="50" />
      <Rect x="100" y="150" w="150" h="150" c="#6669" r="50" />
    </div>
  );
};

type Message = {
  message: string;
};

export const AppWithState: FC<Message> = (props) => {
  const msgStyle = {
    fontSize: "24px",
    color: "#900",
    margin: "20px 0px",
    padding: "5px",
    borderBotton: "2px solid #900",
  };

  const btnStyle = {
    fontSize: "20px",
    padding: "0px 10px",
  };

  const [msg, setMsg] = useState("this is state message");

  const updateMessage = useCallback((msg) => {
    // console.log("clicked");
    setMsg((msg) => msg + "!");
  }, []);

  return (
    <div className="container">
      <h1>React</h1>
      <p style={msgStyle}>{props.message}</p>
      <p style={msgStyle}>{msg}</p>
      <button style={btnStyle} onClick={updateMessage}>
        クリックすると「！」が追加する
      </button>
    </div>
  );
};

export default App;
