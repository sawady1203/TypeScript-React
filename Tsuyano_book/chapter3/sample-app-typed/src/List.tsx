import React, { FC, CSSProperties } from "react";
import "./App.css";

export type ListData = {
  message: string[];
  title: string;
};

const ListApp: FC<ListData> = (listdata) => {
  const msgStyle: CSSProperties = {
    fontSize: "24px",
    color: "#900",
    margin: "20px 0px",
    padding: "5px",
  };

  return (
    <div className="container">
      <h2 style={msgStyle}>show lists.</h2>
      <List message={listdata.message} title={listdata.title}></List>
    </div>
  );
};

const List: FC<ListData> = (props) => {
  let item_number: number = 1;
  let data = props.message;

  const titleStyle: CSSProperties = {
    fontSize: "20pt",
    fontWeight: "bold",
    color: "blue",
  };

  return (
    <div className="container">
      <p style={titleStyle}>{props.title}</p>
      <ul>
        {data.map((item) => (
          <Item key={item_number} value={item} num={item_number++} />
        ))}
      </ul>
    </div>
  );
};

type Item = {
  value: string;
  num: number;
};

const Item: FC<Item> = (props) => {
  const listStyle: CSSProperties = {
    listStyleType: "square",
    fontSize: "16pt",
    color: "#06",
    margin: "0px",
    padding: "0px",
  };

  const NumStyle: CSSProperties = {
    fontWeight: "bold",
    color: "red",
  };

  return (
    <div className="container">
      <li style={listStyle}>
        <span style={NumStyle}>[{props.num}]</span>
        {props.value}
      </li>
    </div>
  );
};

export default ListApp;
