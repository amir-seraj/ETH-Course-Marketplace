import Image from "next/image";
import Link from "next/link";

export default function Card({ course, disabled, Footer, state }) {
  return (
    <div className="overflow-hidden bg-white shadow-md rounded-xl md:max-w-2xl">
      <div className="flex h-full">
        <div className="flex-1 h-full next-image-wrapper">
          <Image
            className={`object-cover ${disabled && "filter grayscale"}`}
            src={course.coverImage}
            layout="responsive"
            width="200"
            height="230"
            alt={course.title}
          />
        </div>
        <div className="p-8 pb-4 flex-2">
          <div className="flex items-center">
            <div className="mr-2 text-sm font-semibold tracking-wide text-indigo-500 uppercase">
              {course.type}
            </div>
            <div>
              {state === "activated" && (
                <div className="p-1 px-3 text-xs text-black bg-green-200 rounded-full">
                  Activated
                </div>
              )}
              {state === "deactivated" && (
                <div className="p-1 px-3 text-xs text-black bg-red-200 rounded-full">
                  Deactivated
                </div>
              )}
              {state === "purchased" && (
                <div className="p-1 px-3 text-xs text-black bg-yellow-200 rounded-full">
                  Pending
                </div>
              )}
            </div>
          </div>
          <Link href={`/courses/${course.slug}`}>
            <a className="block h-12 mt-1 text-sm font-medium leading-tight text-black sm:text-lg hover:underline">
              {course.title}
            </a>
          </Link>
          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            {course.description.substring(0, 70)}...
          </p>
          {Footer && (
            <div className="mt-2">
              <Footer />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
