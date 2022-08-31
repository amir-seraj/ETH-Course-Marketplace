import { useEffect, useState } from "react";
import useSWR from "swr";

const adminAddresses = {
  "370a2af2cd258778b0d46d6f48fc567a86ab52f9c76c02c9ad3e472782ade724": true,
};
export const handler = (web3, provider) => () => {
  const { data, mutate, ...swrResponse } = useSWR(
    () => (web3 ? "web3/accounts" : null),
    async () => {
      const accounts = await web3.eth.getAccounts();
      return accounts[0];
    }
  );

  useEffect(() => {
    provider &&
      provider.on("accountsChanged", (accounts) => {
        mutate(accounts[0] ?? null);
      });
  }, [provider]);
  return {
    data,
    isAdmin: (data && adminAddresses[web3.utils.keccak256(data)]) ?? false,
    mutate,
    ...swrResponse,
  };
};
