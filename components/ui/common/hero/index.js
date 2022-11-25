export default function Hero() {
  return (
    <section className="text-left lg:2/6 my-28">
      <div className="text-6xl font-semibold leading-none text-teal-900">
        Grow your career as a developer
      </div>
      <div className="mt-6 text-xl antialiased font-light text-true-gray-500">
        Learn programming and web development the easy way! Get unlimited access
        to all of our courses.
      </div>
      <div className="flex mt-5 sm:mt-8 lg:justify-start">
        <div className="rounded-md shadow">
          <a
            href="#"
            className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white bg-teal-600 border border-transparent rounded-md hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
          >
            Get started
          </a>
        </div>
      </div>
    </section>
  );
}
