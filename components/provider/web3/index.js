const {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} = require("react");

import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import { setupHooks } from "./hooks/setupHooks";
const Web3Context = createContext();

export default function Web3Provider({ children }) {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
    contract: null,
    isLoading: true,
    hooks: setupHooks(),
  });
  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        const web3 = new Web3(provider);
        setWeb3Api({
          provider,
          web3,
          isLoading: false,
          contract: null,
          hooks: setupHooks(web3, provider),
        });
      } else {
        setWeb3Api((api) => ({ ...api, isLoading: false }));
      }
    };
    loadProvider();
  }, []);
  const _web3Api = useMemo(() => {
    const { web3, provider, isLoading } = web3Api;
    return {
      ...web3Api,
      // isWeb3Loaded: web3 != null,
      requireInstall: !isLoading && !web3,
      connect: provider
        ? async () => {
            try {
              await provider.request({ method: "eth_requestAccounts" });
            } catch (error) {
              console.error("Cannot retrieve account!");
            }
          }
        : () => {
            console.error(
              "Cannot connect to Metamask, Please reload your browser"
            );
          },
    };
  }, [web3Api]);
  return (
    <Web3Context.Provider value={_web3Api}>{children}</Web3Context.Provider>
  );
}

export function useWeb3() {
  return useContext(Web3Context);
}

export function useHooks(callback) {
  const { hooks } = useWeb3();
  return callback(hooks);
}
