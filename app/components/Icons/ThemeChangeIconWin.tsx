import React from "react";

function ThemeChangeIconWin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={props.className}
      width="53"
      height="20"
      viewBox="0 0 53 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect width="30" height="20" rx="4" fill="#C4C4C4" />
      <text
        fill="black"
        xmlSpace="preserve"
        style={{ whiteSpace: "pre" }}
        fontFamily="Source Sans Pro"
        fontSize="12"
        fontWeight="600"
        letterSpacing="0em">
        <tspan x="7" y="13.766">
          Alt
        </tspan>
      </text>
      <rect x="33" width="20" height="20" rx="4" fill="#C4C4C4" />
      <path d="M42.58 14V7.32798H40V6.15198H46.5V7.32798H43.972V14H42.58Z" fill="black" />
    </svg>
  );
}

export default ThemeChangeIconWin;
