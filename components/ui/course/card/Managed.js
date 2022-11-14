const Item = ({ title, value, className }) => {
  return (
    <div className={`px-4 py-3 ${className} sm:px-6`}>
      <div className="text-sm font-medium text-gray-500">{title}</div>
      <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
        {value}
      </div>
    </div>
  );
};

export default function ManagedCourseCard({ children, course }) {
  return (
    <div className="w-1/2 m-3 overflow-hidden bg-white border shadow sm:rounded-lg">
      <div className="border-t border-gray-200">
        {Object.keys(course).map((key) => (
          <Item
            title={key[0].toUpperCase() + key.slice[1]}
            value={course[key]}
            key={key}
            className="bg-indigo-100"
          />
        ))}
        <div className="px-4 py-5 bg-white sm:px-6">{children}</div>
      </div>
    </div>
  );
}
