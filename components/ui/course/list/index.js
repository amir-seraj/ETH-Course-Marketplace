import { CourseCard } from "@components/ui/course/";

export default function List({ courses, children }) {
  return (
    <section className="grid grid-cols-1 gap-4 mb-5 lg:grid-cols-2">
      {courses.map((course) => children(course))}
    </section>
  );
}
