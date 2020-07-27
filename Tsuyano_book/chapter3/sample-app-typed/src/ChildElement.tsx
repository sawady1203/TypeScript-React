import React, { FC, CSSProperties } from "react";
import "./App.css";

export type ChildrenType = {
  title: string;
  message: string;
};

const UseChildElement: FC = () => {
  const message: string =
    "これはコンポーネント内のコンテンツです。\
    マルでテキストを分割し、リストにして表示します。\
     改行は必要ありません。";

  return (
    <div className="container">
      <Message title="Children!" message={message} />
    </div>
  );
};

const Message: FC<ChildrenType> = (props) => {
  const liStyle: CSSProperties = {
    fontSize: "16pt",
    color: "#06",
    margin: "0px",
    padding: "0px",
  };
  let content = props.message;
  let arr = content.split("。");
  let arr2: string[] = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].trim() !== "") {
      arr2.push(arr[i]);
    }
  }
  let list = arr2.map((value, key) => (
    <li style={liStyle} key={key}>
      {value}
    </li>
  ));
  return (
    <div className="container">
      <h2>{props.title}</h2>
      <ol>{list}</ol>
    </div>
  );
};

export default UseChildElement;
