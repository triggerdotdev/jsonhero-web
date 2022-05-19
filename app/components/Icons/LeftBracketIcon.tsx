import React from "react";

function LeftBracketIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={props.className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect width="20" height="20" rx="4" fill="#C4C4C4" />
      <path d="M8 16V4H12V5.08837H10.0853V14.9116H12V16H8Z" fill="black" />
    </svg>
  );
}

export default LeftBracketIcon;
