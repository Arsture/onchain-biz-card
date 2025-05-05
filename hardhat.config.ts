import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();

const { PRIVATE_KEY, RPC_POLY, RPC_AMOY } = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    polygon: {
      url: RPC_POLY,
      chainId: 137,
      accounts: [PRIVATE_KEY!],
    },
    amoy: {
      url: RPC_AMOY,
      chainId: 80002,
      accounts: [PRIVATE_KEY!],
    },
  },
};

export default config;
