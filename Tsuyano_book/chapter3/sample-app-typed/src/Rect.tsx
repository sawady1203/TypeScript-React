import React, { FC, CSSProperties } from "react";

type RectInfo = {
  x: string;
  y: string;
  w: string;
  h: string;
  c: string;
  r: string;
};

// propsをうけとってCSSProperties形式にして返す
const calRectStyle = (data: RectInfo): CSSProperties => {
  let _backgroundColor = data.c;
  const _position = "absolute";
  return {
    backgroundColor: _backgroundColor,
    position: _position,
    left: data.x + "px",
    top: data.y + "px",
    width: data.w + "px",
    height: data.h + "px",
    borderRadius: data.r + "px",
  };
};

const Rect: FC<RectInfo> = (input_rect_data) => {
  const rect_style = calRectStyle(input_rect_data);
  return (
    <div className="container">
      <div style={rect_style}></div>
    </div>
  );
};

export default Rect;
