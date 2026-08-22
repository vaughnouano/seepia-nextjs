export default function ChevronNext({ onClick, ...props }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      style={{ cursor: "pointer" }}
      {...props}
    >
      <path
        d="M17.6 30.3996L32 15.9996L17.6 1.59961L14.1667 5.03294L25.1333 15.9996L14.1667 26.9663L17.6 30.3996Z"
        fill="#EF6890"
      />
    </svg>
  );
}
