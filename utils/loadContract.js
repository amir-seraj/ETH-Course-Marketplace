// const NETWORK_ID = process.env.NEXT_PUBLIC_NETWORK_ID;

export const loadContract = async (name, web3) => {
  const res = await fetch(`/contracts/CourseMarketplace.json`);
  const Artifact = await res.json();

  let contract = null;
  try {
    contract = new web3.eth.Contract(
      Artifact.abi,
      Artifact.networks[NETWORK_ID].address
    );
    console.log(contract);
  } catch {
    console.log(`Contract ${name} cannot be loaded!`);
  }
  return contract;
};