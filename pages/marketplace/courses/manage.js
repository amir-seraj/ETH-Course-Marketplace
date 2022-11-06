import { Button } from "@components/ui/common";
import { CourseFilter, OwnedCourseCard } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { MarketHeader } from "@components/ui/marketplace";

export default function ManageCourses() {
  return (
    <>
      <MarketHeader />
      <section className="grid grid-cols-1">
        <OwnedCourseCard />
        {/* <OwnedCourseCard>
          <div className="relative flex mr-2 rounded-md">
            <input
              type="text"
              name="account"
              id="account"
              className="block p-4 border-gray-300 rounded-md shadow-md w-96 focus:ring-indigo-500 focus:border-indigo-500 pl-7 sm:text-sm"
              placeholder="0x2341ab..."
            />
            <Button>Verify</Button>
          </div>
        </OwnedCourseCard> */}
      </section>
    </>
  );
}
ManageCourses.Layout = BaseLayout;
