import React from "react";

function LetterIcon({ letter, style }: any) {
  return (
    <svg
      style={style}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0 4C0 1.79086 1.79086 0 4 0H16C18.2091 0 20 1.79086 20 4V16C20 18.2091 18.2091 20 16 20H4C1.79086 20 0 18.2091 0 16V4Z"
        fill="#C4C4C4"
      />
      <text
        fill="black"
        xmlSpace="preserve"
        style={{ whiteSpace: "pre" }}
        fontFamily="Source Sans Pro"
        fontSize="12"
        fontWeight="550"
        letterSpacing="0em"
        x="50%"
        y="55%"
        dominantBaseline="middle"
        textAnchor="middle">
        {letter.toUpperCase()}
      </text>
    </svg>
  );
}

export default LetterIcon;
