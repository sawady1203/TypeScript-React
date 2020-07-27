import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App, { AppWithState } from "./App";
import ListApp, { ListData } from "./List";
import UseChildElement from "./ChildElement";
import * as serviceWorker from "./serviceWorker";
import FormApp from "./Event";

// // ステートの値
// type state_value

let listdata: ListData = {
  message: [
    "This is list sample.",
    "これはリストのサンプルです。",
    "配列をリストに変換します",
  ],
  title: "サンプルリスト",
};

ReactDOM.render(
  <div>
    <React.StrictMode>
      {/* <App /> */}
      <AppWithState message="Hello AppWithProps" />
      <ListApp message={listdata.message} title={listdata.title} />
      <UseChildElement />
      <FormApp />
    </React.StrictMode>
  </div>,
  document.getElementById("root")
);

serviceWorker.unregister();
