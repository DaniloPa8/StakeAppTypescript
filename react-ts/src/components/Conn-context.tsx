import React from "react";
import { Contract as ContractType } from "web3-eth-contract";
// Context storing the current user account and both contract instances

export interface ConnContextInterface {
  account: string;
  tsavings: ContractType;
  isavings: ContractType;
  token: ContractType;
}

const ConnContext = React.createContext<ConnContextInterface>(
  {} as ConnContextInterface
);

export default ConnContext;
