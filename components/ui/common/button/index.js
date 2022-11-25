const SIZE = {
  sm: "p-2 text-base xs:px-4",
  md: "p-3 text-base xs:px-8",
  lg: "p-3 text-lg xs:px-8",
};

export default function Button({
  children,
  className,
  hoverable = true,
  size = "md",
  variant = "purple",
  ...rest
}) {
  const variants = {
    white: `text-black bg-white`,
    green: `text-white bg-green-600 ${hoverable && "hover:bg-green-700"}`,
    purple: `text-white bg-teal-600 ${hoverable && "hover:bg-teal-700"}`,
    red: `text-white bg-red-600 ${hoverable && "hover:bg-red-700"}`,
    lightPurple: `text-teal-700 bg-teal-100 ${
      hoverable && "hover:bg-teal-200"
    }`,
  };
  const sizeClass = SIZE[size];

  return (
    <button
      {...rest}
      className={`${sizeClass} disabled:opacity-50 disabled:cursor-not-allowed border rounded-md font-medium ${className} ${variants[variant]}`}
    >
      {children}
    </button>
  );
}
