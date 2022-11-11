import { useAccount, useManagedCourses } from "@components/hooks/web3";
import { Button } from "@components/ui/common";
import {
  CourseFilter,
  ManagedCourseCard,
  OwnedCourseCard,
} from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { MarketHeader } from "@components/ui/marketplace";
import { useState } from "react";

export default function ManagedCourses() {
  const [email, setEmail] = useState("");
  const { account } = useAccount();
  const { managedCourses } = useManagedCourses(account.data);
  const verifyCourse = (email, { hash, proof }) => {};
  return (
    <>
      <MarketHeader />
      <CourseFilter />
      <section className="flex">
        {managedCourses.data?.map((course) => (
          <ManagedCourseCard key={course.ownedCourseId} course={course}>
            <div className="relative flex mr-2 rounded-md">
              <input
                type="text"
                name="account"
                id="account"
                className="block p-4 border-gray-300 rounded-md shadow-md w-96 focus:ring-indigo-500 focus:border-indigo-500 pl-7 sm:text-sm"
                placeholder="0x2341ab..."
                value={email}
                onChange={(e) => {
                  let value = e.target.value;
                  setEmail(value);
                }}
              />
              <Button
                onClick={() => {
                  verifyCourse(email, {
                    hash: course.hash,
                    proof: course.proof,
                  });
                }}
              >
                Verify
              </Button>
            </div>
          </ManagedCourseCard>
        ))}
      </section>
    </>
  );
}

ManagedCourses.Layout = BaseLayout;
