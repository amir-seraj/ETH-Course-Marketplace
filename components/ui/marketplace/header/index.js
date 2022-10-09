import { EthRates, WalletBar } from "@components/ui/web3";
import { Breadcrumbs } from "@components/ui/common";

const LINKS = [
  {
    href: "/marketplace",
    value: "BUY",
  },
  {
    href: "/marketplace/courses/owned",
    value: "MY COURSES",
  },
  {
    href: "/marketplace/courses/manage",
    value: "MANAGE COURSES",
  },
];

export default function Header() {
  return (
    <>
      <div className="pt-4">
        <WalletBar />
      </div>
      <EthRates />
      <div className="flex flex-row-reverse p-4">
        <Breadcrumbs items={LINKS} />
      </div>
    </>
  );
}
