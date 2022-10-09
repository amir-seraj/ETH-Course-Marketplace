import { useEthPrice, COURSE_PRICE } from "@components/hooks/useEthPrice";
import { Loader } from "@components/ui/common";
import Image from "next/image";
export default function EthRates() {
  const { eth } = useEthPrice();

  return (
    <div className="grid grid-cols-4">
      <div className="flex flex-1 items-stretch text-center">
        <div className="p-10 border drop-shadow rounded-md">
          <div className="flex items-center">
            {eth.data ? (
              <>
                <Image
                  layout="fixed"
                  src="/small-eth.webp"
                  height="35"
                  width="35"
                  alt="eth-icon"
                />
                <span className="text-2xl font-bold"> = {eth.data}$</span>
              </>
            ) : (
              <Loader size="sm" />
            )}
          </div>
          <p className="text-xl font-bold  text-gray-500">Current eth Price</p>
        </div>
      </div>
      <div className="flex flex-1 items-stretch text-center">
        <div className="p-10 border drop-shadow rounded-md">
          <div className="flex items-center">
            {eth.perItem ? (
              <>
                <Image
                  layout="fixed"
                  src="/small-eth.webp"
                  height="35"
                  width="35"
                  alt="eth-icon"
                />
                <span className="text-2xl font-bold">
                  {eth.perItem ? eth.perItem.toFixed(5) : "Not Found"} =
                  {COURSE_PRICE}$
                </span>
              </>
            ) : (
              <Loader size="sm" />
            )}
          </div>
          <p className="text-xl font-bold  text-gray-500">Price per course</p>
        </div>
      </div>
    </div>
  );
}
