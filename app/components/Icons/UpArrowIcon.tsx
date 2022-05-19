import React from "react";

function UpArrowIcon(props: React.SVGProps<SVGSVGElement>) {
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
        d="M13.3802 13.2727H6.94479C6.13111 13.2727 5.65806 12.3527 6.13145 11.6909L9.38082 7.14829C9.78196 6.58748 10.6169 6.59135 11.0129 7.15586L14.1989 11.6985C14.6637 12.3612 14.1897 13.2727 13.3802 13.2727Z"
        fill="black"
        stroke="black"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default UpArrowIcon;
