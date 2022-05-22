import React from "react";

function LeftArrowIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={props.className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect width="20" height="20" rx="4" fill="#C4C4C4" />
      <path
        d="M13.2727 6.9228V13.3582C13.2727 14.1719 12.3527 14.645 11.6909 14.1716L7.14829 10.9222C6.58748 10.5211 6.59135 9.68608 7.15586 9.29016L11.6985 6.10409C12.3612 5.6393 13.2727 6.11336 13.2727 6.9228Z"
        fill="black"
        stroke="black"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default LeftArrowIcon;
