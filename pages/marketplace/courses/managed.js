import { useAdmin, useManagedCourses } from "@components/hooks/web3";
import { useWeb3 } from "@components/providers";
import { Button, Message } from "@components/ui/common";
import {
  CourseFilter,
  ManagedCourseCard,
  OwnedCourseCard,
} from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { MarketHeader } from "@components/ui/marketplace";
import { useState } from "react";

const VerificationInput = ({ onVerify }) => {
  const [email, setEmail] = useState("");

  return (
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
          onVerify(email);
        }}
      >
        Verify
      </Button>
    </div>
  );
};

export default function ManagedCourses() {
  const [proofedOwnership, setProofedOwnership] = useState({});
  const { account } = useAdmin({ redirectTo: "/marketplace" });
  const { web3, contract } = useWeb3();
  const { managedCourses } = useManagedCourses(account);
  const verifyCourse = (email, { hash, proof }) => {
    const emailHash = web3.utils.sha3(email);
    const proofToCheck = web3.utils.soliditySha3(
      { type: "bytes32", value: emailHash },
      { type: "bytes32", value: hash }
    );
    proofToCheck === proof
      ? setProofedOwnership({ ...proofedOwnership, [hash]: true })
      : setProofedOwnership({ ...proofedOwnership, [hash]: false });
  };

  const activateCourse = async (courseHash) => {
    try {
      await contract.methods
        .activateCourse(courseHash)
        .send({ from: account.data });
    } catch (error) {
      console.error(error.message);
    }
  };
  if (!account.isAdmin) {
    return null;
  }

  return (
    <>
      <MarketHeader />
      <CourseFilter />
      <section className="flex">
        {managedCourses.data?.map((course) => (
          <ManagedCourseCard key={course.ownedCourseId} course={course}>
            <VerificationInput
              onVerify={(email) => {
                verifyCourse(email, { hash: course.hash, proof: course.proof });
              }}
            ></VerificationInput>
            {proofedOwnership[course.hash] && (
              <div className="mt-2">
                <Message>Verified!</Message>
              </div>
            )}
            {proofedOwnership[course.hash] === false && (
              <div className="mt-2">
                <Message type="danger">Wrong Proof!</Message>
              </div>
            )}
            {course.state === "purchased" && (
              <div>
                <Button
                  variant="green"
                  onClick={() => {
                    activateCourse(course.hash);
                  }}
                >
                  Activate
                </Button>
                <Button variant="red">Deactivate</Button>
              </div>
            )}
          </ManagedCourseCard>
        ))}
      </section>
    </>
  );
}

ManagedCourses.Layout = BaseLayout;
