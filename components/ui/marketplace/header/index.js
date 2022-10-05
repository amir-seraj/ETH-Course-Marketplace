import { EthRates, WalletBar } from "@components/ui/web3";
import { Breadcrumbs } from "@components/ui/common";

export default function Header() {
  return (
    <>
      <div className="pt-4">
        <WalletBar />
      </div>
      <EthRates />
      <div className="p-4 flex flex-row-reverse">
        <Breadcrumbs />
      </div>
    </>
  );
}
