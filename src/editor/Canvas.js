import React from "react";


const Canvas = (props) => {

  const onRectClick = (index) => {
  };  

  return (
    <svg width="1024" height="768" >
      {props.slideshow.shapes.map(function (s, index) {
        return (
          <rect x={s.x} y={s.y} id={index} width={s.width} height={s.height} stroke="black" fill="transparent" strokeWidth="4"
            onClick={ () => onRectClick(index) } 
          />
        );
      })}

    </svg>
  );
}

export default Canvas;
