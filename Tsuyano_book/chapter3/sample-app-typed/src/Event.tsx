import React, { FC, CSSProperties, useState } from "react";
import "./App.css";

const FormApp: FC = () => {
  const inputStyle: CSSProperties = {
    fontSize: "12pt",
    padding: "5px",
  };

  const [message, setMessage] = useState("type your name:");
  const [input, setInput] = useState("");

  const doChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const doSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setMessage((prev) => "Hello, " + input + "!!");
    event.preventDefault();
  };

  return (
    <div className="container">
      <h2>{message}</h2>
      <form onSubmit={doSubmit}>
        <label>
          <span style={inputStyle}></span>Message:
          <input
            type="text"
            style={inputStyle}
            onChange={doChange}
            required
            pattern="[A-Za-z _,.]+"
          />
        </label>
        <input type="submit" style={inputStyle} value="Click" />
      </form>
    </div>
  );
};

export default FormApp;
