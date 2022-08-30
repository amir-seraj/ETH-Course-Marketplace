import { Hero } from "@components/ui/common";
import { CourseCard, CourseList } from "@components/ui/course";
import { getAllCourses } from "@content/courses/fetcher";

export default function Home({ courses }) {
  return (
    <>
      <Hero />
      <CourseList courses={courses}>
        {(course) => <CourseCard key={course.id} course={course}></CourseCard>}
      </CourseList>
    </>
  );
}
export function getStaticProps() {
  const { data } = getAllCourses();
  return { props: { courses: data } };
}
