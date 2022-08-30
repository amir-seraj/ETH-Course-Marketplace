import Image from "next/image";
import Link from "next/link";

export default function Card({ course }) {
  return (
    <div className="overflow-hidden bg-white shadow-md rounded-xl md:max-w-2xl">
      <div className="flex h-full">
        <div className="h-full">
          <Image
            className="object-cover"
            src={course.coverImage}
            alt={course.title}
            layout="fixed"
            width="200"
            height="230"
          />
        </div>
        <div className="p-8">
          <Link href={`/courses/${course.slug}`}>
            <a className="block mt-1 text-lg font-medium leading-tight text-black hover:underline">
              {course.title}
            </a>
          </Link>
          <div className="mt-3 text-sm font-semibold tracking-wide text-indigo-500 uppercase">
            {course.type}
          </div>
          <p className="mt-2 text-gray-500">{course.description}</p>
        </div>
      </div>
    </div>
  );
}
