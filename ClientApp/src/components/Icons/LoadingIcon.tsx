export function LoadingIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={props.className}
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
    >
      <circle
        cx="13"
        cy="13"
        r="10"
        stroke="black"
        strokeOpacity="0.3"
        strokeWidth="4"
      />
      <path
        d="M13 23C7.47715 23 3 18.5228 3 13"
        stroke="#4338CA"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
