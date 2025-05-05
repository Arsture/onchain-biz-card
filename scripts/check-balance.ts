import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Using account:", deployer.address);
  console.log(
    "Balance:",
    ethers.formatEther(await deployer.provider!.getBalance(deployer))
  );
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
