import { useHooks } from "@components/provider/web3";
const enhanceHook = (swrRes) => {
  return { ...swrRes, hasInitialRes: swrRes.data || swrRes.error };
};
export const useNetwork = () => {
  const swrRes = enhanceHook(useHooks((hooks) => hooks.useNetwork)());
  return {
    network: swrRes,
  };
};
export const useAccount = () => {
  const swrRes = enhanceHook(useHooks((hooks) => hooks.useAccount)());
  return {
    account: swrRes,
  };
};
