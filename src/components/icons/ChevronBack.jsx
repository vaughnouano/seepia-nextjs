export default function ChevronBack({ onClick, ...props }) {
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
        d="M14.4 30.3996L0 15.9996L14.4 1.59961L17.8333 5.03294L6.86667 15.9996L17.8333 26.9663L14.4 30.3996Z"
        fill="#EF6890"
      />
    </svg>
  );
}
