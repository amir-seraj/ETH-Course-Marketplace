import { useWalletInfo } from "@components/hooks/web3";
import { useWeb3 } from "@components/providers";
import { Button } from "@components/ui/common";

export default function WalletBar() {
  const { requireInstall } = useWeb3();
  const { account, network } = useWalletInfo();

  return (
    <section className="text-white bg-teal-600 rounded-lg">
      <div className="p-8">
        <h1 className="text-base break-words xs:text-xl">
          Hello, {account.data}
        </h1>
        <h2 className="mb-5 text-sm subtitle xs:text-base">
          I hope you are having a great day!
        </h2>
        <div className="flex items-center justify-between">
          <div className="sm:flex sm:justify-center lg:justify-start">
            <Button className="p-2 mr-2 text-sm xs:text-lg" variant="white">
              Learn how to purchase
            </Button>
          </div>
          <div>
            {network.hasInitialResponse && !network.isSupported && (
              <div className="p-4 bg-red-400 rounded-lg">
                <div>Connected to wrong network</div>
                <div>
                  Connect to: {` `}
                  <strong className="text-2xl">{network.target}</strong>
                </div>
              </div>
            )}
            {requireInstall && (
              <div className="p-4 bg-yellow-500 rounded-lg">
                Cannot connect to network. Please install Metamask.
              </div>
            )}
            {network.data && (
              <div>
                <span>Currently on </span>
                <strong className="text-2xl">{network.data}</strong>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
