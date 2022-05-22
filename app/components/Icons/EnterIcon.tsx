import React from "react";

function EnterIcon(props: React.SVGProps<SVGSVGElement>) {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.9687 8.64781C14.047 7.97563 14.0476 7.12088 14.0476 6H15V6.02527C15 7.11555 15 8.01971 14.9153 8.7472C14.8298 9.4813 14.6519 10.1053 14.2405 10.5921C13.8222 11.0869 13.2176 11.3764 12.4237 11.5545C11.7324 11.7095 10.8584 11.7885 9.76541 11.8301L9.78339 14L5 11.4254L9.74013 8.7796L9.75791 10.9254C10.8154 10.8842 11.6067 10.8086 12.2048 10.6745C12.884 10.5221 13.2613 10.3058 13.4977 10.0261C13.741 9.7383 13.8905 9.31899 13.9687 8.64781Z"
        fill="black"
      />
    </svg>
  );
}

export default EnterIcon;
