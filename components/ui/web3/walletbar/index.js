import { useWeb3 } from "@components/provider";

export default function WalletBar({ address, network }) {
  const { requireInstall } = useWeb3();
  return (
    <section className="text-white bg-indigo-600">
      <div className="p-8">
        <h1 className="text-2xl">Hello, {address}</h1>
        <h2 className="mb-5 text-xl subtitle">
          I hope you are having a great day!
        </h2>
        <div className="flex items-center justify-between">
          <div className="sm:flex sm:justify-center lg:justify-start">
            <div className="rounded-md shadow">
              <a
                href="#"
                className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-black bg-white border border-transparent rounded-md hover:bg-gray-100 md:py-4 md:text-lg md:px-10"
              >
                Learn how to purchase
              </a>
            </div>
          </div>
          <div>
            {!network.hasInitialRes && !network.isSupported && (
              <div className="p-4 bg-red-400 rounded-lg ">
                <div>Connected to wrong Network</div>
                <div>
                  Connect to :{" "}
                  <strong className="text-xl">{network.target}</strong>
                </div>
              </div>
            )}
            {requireInstall && (
              <div className="p-4 text-black bg-yellow-500 rounded-lg">
                Cannot connect to network! <br />
                Please install Metamask
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
