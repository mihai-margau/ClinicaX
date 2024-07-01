import { useRef, useEffect } from "react";

const Captcha = (props) => {
  const canvas = useRef();
  let ctx = null;
  useEffect(() => {
    const canvasEle = canvas?.current;
    if (canvasEle) {
      // @ts-expect-error ignore if undefiend
      canvasEle.width = canvasEle.clientWidth;
      // @ts-expect-error ignore if undefiend
      canvasEle.height = canvasEle.clientHeight;
      // @ts-expect-error ignore if undefiend
      ctx = canvasEle.getContext("2d");
    }
  }, [props]);
  useEffect(() => {
    writeText({ text: props.captcha, x: 150, y: 15 });
  }, [props]);
  const writeText = (info, style = {}) => {
    const { text, x, y } = info;
    const {
      fontSize = 20,
      letterSpacing = "10px",
      fontFamily = "Arial",
      color = props.textColor,
      textAlign = "center",
      textBaseline = "top",
    } = style;

    ctx.beginPath();
    ctx.font = fontSize + "px " + fontFamily;
    ctx.textAlign = textAlign;
    ctx.letterSpacing = letterSpacing;
    ctx.textBaseline = textBaseline;
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
    ctx.stroke();
  };

  return (
    <div className={"captcha " + props.className}>
      <canvas
        id="Captcha"
        // @ts-expect-error ignore if undefiend
        ref={canvas}
        height="50"
      ></canvas>
    </div>
  );
};

export default Captcha;
