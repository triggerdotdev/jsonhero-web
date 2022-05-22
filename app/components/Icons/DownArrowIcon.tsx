import React from "react";

function DownArrowIcon(props: React.SVGProps<SVGSVGElement>) {
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
        d="M13.3802 6.99999H6.94479C6.13111 6.99999 5.65806 7.91998 6.13145 8.58178L9.38082 13.1244C9.78196 13.6852 10.6169 13.6814 11.0129 13.1169L14.1989 8.57421C14.6637 7.91151 14.1897 6.99999 13.3802 6.99999Z"
        fill="black"
        stroke="black"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default DownArrowIcon;
