import { useAccount, useOwnedCourse } from "@components/hooks/web3";
import { useWeb3 } from "@components/providers";
import { Message, Modal } from "@components/ui/common";
import { CourseHero, Curriculum, Keypoints } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { getAllCourses } from "@content/courses/fetcher";

export default function Course({ course }) {
  const { account } = useAccount();
  const { ownedCourse } = useOwnedCourse(course, account.data);
  const { isLoading } = useWeb3();

  const courseState = ownedCourse.data?.state;
  // const courseState = "activated";

  const isLocked =
    !courseState ||
    courseState === "purchased" ||
    courseState === "deactivated";

  return (
    <>
      <div className="py-4">
        <CourseHero
          title={course.title}
          description={course.description}
          image={course.coverImage}
          hasOwner={!!ownedCourse.data}
        />
      </div>
      <Keypoints points={course.wsl} />
      {courseState && (
        <div className="max-w-5xl mx-auto">
          {courseState === "purchased" && (
            <Message type="warning">
              Course is purchased and waiting for activation. Process can take
              up to 24 hours.{" "}
              <i className="block font-normal">
                In case of any question, please contact amirseraj.ir@gmail.com
              </i>
            </Message>
          )}
          {courseState === "activated" && (
            <Message type="success">
              MummyCode wishes you happy watching.
            </Message>
          )}
          {courseState === "deactivated" && (
            <Message type="danger">
              course has been deactivated, due to incorrect purchased data. The
              functionality to watch the course has been temporarily disabled.
              <i className="block font-normal">
                In case of any question, please contact amirseraj.ir@gmail.com
              </i>
            </Message>
          )}
        </div>
      )}
      <Curriculum
        locked={isLocked}
        courseState={courseState}
        isLoading={isLoading}
      />
      <Modal />
    </>
  );
}

export function getStaticPaths() {
  const { data } = getAllCourses();

  return {
    paths: data.map((c) => ({
      params: {
        slug: c.slug,
      },
    })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const { data } = getAllCourses();
  const course = data.filter((c) => c.slug === params.slug)[0];

  return {
    props: {
      course,
    },
  };
}

Course.Layout = BaseLayout;
