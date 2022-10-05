export default function Breadcrumbs() {
  return (
    <nav aria-label="breadcrumb" className="mb-4">
      <ol className="flex leading-none font-medium text-gray-500  divide-x ">
        <li className="pr-4 hover:text-gray-900">
          <a href="#">Buy</a>
        </li>
        <li className="px-4 hover:text-gray-900">
          <a href="#">My Courses</a>
        </li>
        <li className="px-4 hover:text-gray-900">
          <a href="#">Manage Courses</a>
        </li>
      </ol>
    </nav>
  );
}
