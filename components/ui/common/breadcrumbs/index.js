import { ActiveLink } from "@components/ui/common";

export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="breadcrumb" className="mb-4">
      <ol className="flex font-medium leading-none text-gray-500 divide-x ">
        {items.map((item, i) => (
          <li
            className={`${i == 0 ? "pr-4" : "px-4"} hover:text-gray-900 `}
            key={item.href}
          >
            <ActiveLink
              href={item.href}
              activeLinkClass="text-indigo-700 bg-indigo-100/50 p-3 rounded-2xl"
            >
              <a>{item.value}</a>
            </ActiveLink>
          </li>
        ))}
      </ol>
    </nav>
  );
}
