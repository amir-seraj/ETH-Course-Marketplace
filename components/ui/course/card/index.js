import Image from "next/image";
import Link from "next/link";

export default function Card({ course, Footer, disabled }) {
  return (
    <div className="overflow-hidden bg-white shadow-md rounded-xl md:max-w-2xl">
      <div className="flex h-full">
        <div className="flex-1 h-full next-image-wrapper">
          <Image
            className={`object-cover ${disabled && "filter grayscale"}`}
            src={course.coverImage}
            layout="responsive"
            width="200"
            height="300"
            alt={course.title}
          />
        </div>
        <div className="p-8 pb-4 flex-2">
          <div className="text-sm font-semibold tracking-wide text-indigo-500 uppercase">
            {course.type}
          </div>
          <Link href={`/courses/${course.slug}`}>
            <a className="block h-12 mt-1 text-sm font-medium leading-tight text-black sm:text-lg hover:underline">
              {course.title}
            </a>
          </Link>
          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            {course.description.substring(0, 70)}...
          </p>
          {Footer && <Footer />}
        </div>
      </div>
    </div>
  );
}
