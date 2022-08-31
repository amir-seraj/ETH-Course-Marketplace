import { useAccount, useNetwork } from "@components/hooks/web3/";
import { CourseCard, CourseList } from "@components/ui/course";
import { WalletBar } from "@components/ui/web3";
import { getAllCourses } from "@content/courses/fetcher";

export default function Marketplace({ courses }) {
  const { account } = useAccount();
  const { network } = useNetwork();
  return (
    <>
      <div className="my-7">
        <WalletBar
          address={account.data}
          network={{
            data: network.data,
            target: network.target,
            isSupported: network.isSupported,
            hasInitialRes: network.hasInitialRes,
          }}
        />
      </div>
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
