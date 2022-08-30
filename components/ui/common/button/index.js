export default function Button({ children, className, ...rest }) {
  return (
    <button
      {...rest}
      className={`disabled:cursor-not-allowed disabled:opacity-40 rounded px-8 py-3 border text-base font-medium mr-8 shadow ${className}`}
    >
      {children}
    </button>
  );
}
