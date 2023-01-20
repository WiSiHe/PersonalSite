import PropTypes from "prop-types"
import * as React from "react"

function LogoQR({ titleId = "", width = "1rem", height = "1rem", ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 542 544"
      aria-labelledby={titleId}
      {...props}
    >
      <path d="M7 79v62h124V17H7v62zm106 0v44H25V35h88v44z" />
      <path d="M43 79v26h52V53H43v26z" />
      <path d="M148 44v27h18v16.9l8.8.3 8.7.3v52l-8.2.3-8.3.3V105h-19v72h36v17h17v105h-17v18h-35v-52h17v17h18v-18h-17v-17h-19v17h-35v18H95v18h18v18h35v17H96v-18H78v-18H61v-17h17v-17h18v-53h35v17h-18v18h17.9l.3-8.8.3-8.7 8.8-.3 8.7-.3V211h-18v-17h-17v-17h17v-19h-18v18H96v-18H43v19h17v17h18v-17h17v34H78v18H60v18H43v18h17v17H7v18h36v17H7v71h18v-8.8c.1-4.8.2-16.6.3-26.2l.2-17.5 8.8-.3 8.7-.3V318h17v16.9l8.8.3 8.7.3.3 8.2.3 8.3H60v19h18v17h70v18h18v35h-18v53h18v18h18v17h35v-8.5c.1-4.7.1-12.8.1-18 0-5.2 0-13.3-.1-18V476h-17v-18h-35v-17h35v-18h17v36h18.2l-.2 8.7c-.1 4.9-.2 12.7-.1 17.5l.1 8.8h17v35h18l.1-8.8c0-4.8 0-12.6-.1-17.4l-.1-8.8H307v17h-18v18h19v-17h53v-18h17v18h18v-18h35.1l-.1 8.8c-.1 4.8-.1 12.6-.1 17.4l.1 8.8h18v-17h17v17h18v-17h18v-36h-18v-17h35v-18h-8.7c-4.9-.1-16.7-.2-26.3-.3l-17.5-.2-.3-8.8-.3-8.7H449v-17h17v-18h17v18h36v-18h-17v-17h17v-19h-35v-17h35v-36h-17v-17h-19v17h-17v-17h-35v-17h35v-18h17v18h36v-36h-17v-18h-19v18h-16.9l-.3 8.7-.3 8.8-17.2.2-17.3.3v-53h17v18h18l.1-9.3c0-5 0-12.9-.1-17.5l-.1-8.2H501v17h18v-36h-53v18h-35v-18H325v18h-17v-53h-18v-18h-53v18h-18v18h18v-17h17v17h18v-17h17v53h18v17l-17.2-.3-17.3-.2-.3-8.8-.3-8.7H254v18h-17v-36h-53v-17h18V88h17V70h-17V53h35l-.1 17.1c0 9.5.2 17.4.4 17.6.5.5 33.9.5 34.4 0s.5-33.9 0-34.4c-.2-.2-8.1-.4-17.6-.4L237 53V17h-18v18h-17V17h-18l-.1 9.2c0 5.1-.1 13.1-.2 17.8l-.2 8.5-8.2.3-8.3.3V17h-19v27zm71 141.5v8.5h-17v-17h17v8.5zm158.8-.3-.3 8.3-8.7.3-8.8.3V212h18l-.3 17.2-.2 17.3-17.2.2-17.3.3v-18h-18v-18h-17v-17h17v-17h53.1l-.3 8.2zm53 0-.3 8.3-17.2.2-17.3.3v-17h35.1l-.3 8.2zm-194 18 .3 8.8H254v17l-17.2-.2-17.3-.3-.3-16c-.1-8.8 0-16.6.3-17.3.3-.9 2.7-1.2 8.7-1l8.3.3.3 8.7zm35.2-.7v8.5h-17v-17h17v8.5zm17 18v8.5l9.3.1c5 0 13 .1 17.7.2l8.5.2.3 8.7.3 8.8H342v18h18v17h-18v17h-17v18h-70v-17h17v-18h-17v-17h17v-18h-17v-18h17v-17h17v8.5zM412.5 238v8.5l-8.2.3-8.3.3v-18.2l8.3.3 8.2.3v8.5zM78 255.5v8.5H61v-17h17v8.5zm176 0v8.5h-35v-7.8c0-4.3.3-8.2.7-8.5.3-.4 8.2-.7 17.5-.7H254v8.5zm177 0v8.5h-18v-17h18v8.5zm-36 18v8.5h-17v-17h17v8.5zm-264.2 17.2.3 8.3H114v-17.1l8.3.3 8.2.3.3 8.2zm123.2-.2v8.5h-17v-17h17v8.5zm176.8.7.3 8.8H448v17h-16.9l-.3 8.7-.3 8.8-17.2.3-17.3.2v-17h17l.1-9.3c0-5 0-12.7-.1-16.9-.1-4.3.2-8.3.5-8.8.4-.7 3.9-1 8.8-.8l8.2.3.3 8.7zM237 308.5v8.5h-18v18h-17v-35h35v8.5zm158 0v8.5h-35v18h-18v35h-35v18l-17.2-.3-17.3-.2-.3-8.8-.3-8.7H255v-18h-18v19h17v34h-16.9l-.3 8.7-.3 8.8-8.7.3-8.8.3V405h-35v-34h18v-18h16.9l.3-8.8.3-8.7h52l.3 8.7.3 8.8H290v-18h17v18h18v-35h18v-18h52v8.5zm-194 35v8.5h-17v-17h17v8.5zm194 9V370h-17v-18h-17v-17h34v17.5zm70.8-8.8.3 8.3H448v18h-17v-35l17.3.2 17.2.3.3 8.2zM95 361.5v8.5H78v-17h17v8.5zm53 0v8.5h-34v-17h34v8.5zm36 0v8.5h-17v-17h17v8.5zm299 0v8.5h-17v-17h17v8.5zm-17 18v8.5h-17v-17h17v8.5zm-35.5 35v26h-52l-.3-26.3-.2-26.2 26.2.2 26.3.3v26zm-158.5 0v8.5h-17v-17h17v8.5zm70 0v8.5h-35v18l-17.2-.3-17.3-.2v-17l8.8-.3 8.7-.3V406h52v8.5zm18 35v8.5h-35v-17h35v8.5zm-71 18v8.6l-8.2-.3-8.3-.3-.3-8.3-.3-8.2H289v8.5zm124 0v8.5h-17v-17h17v8.5zm35 0v8.5h-17v-17h17v8.5zm-247 17v8.5h-17v-7.8c0-4.3.3-8.2.7-8.5.3-.4 4.2-.7 8.5-.7h7.8v8.5zm264.8.2.3 8.3H449v-17.1l8.3.3 8.2.3.3 8.2zm17.2 17.8v8.5h-17v-17h17v8.5z" />
      <path d="M307 273v9h18v-18h-18v9zM395 414v9h18v-18h-18v9zM272 26v9h17v18h53v35h-17V70h-18v17.9l8.8.3 8.7.3.3 26.2.2 26.3h18v-35h17v35h18V53h-17V35h17V17h-18v18h-17V17h-18v18h-17V17h-36v9zM395 79v62h124V17H395v62zm106 0v44h-88V35h88v44z" />
      <path d="M431 79v26h52V53h-52v26zM7 202.4v26.5l9.3.3c5.1.2 13.2.2 18 0l8.7-.3v-34.8l-8.7-.3-8.8-.3-.3-8.8-.3-8.7H7v26.4zM166 220v9h18v-18h-18v9zM7 467v62h124V405H7v62zm106 0v44H25v-88h88v44z" />
      <path d="M43 467v26h52v-52H43v26z" />
    </svg>
  )
}

LogoQR.propTypes = {
  height: PropTypes.string,
  title: PropTypes.any,
  titleId: PropTypes.any,
  width: PropTypes.string,
}

export default LogoQR
