import classes from "./styles/App.module.css";
import { Contract as contractType } from "web3-eth-contract";
import tAbi from "./contracts/TermSavings.json";
import iAbi from "./contracts/IndefiniteSavings.json";
import tokAbi from "./contracts/SavingsToken.json";
import WelcomeScreen from "./components/WelcomeScreen";
import ConnContext from "./components/Conn-context";
import React, { useEffect, useState } from "react";
import store from "./store";
import { Provider } from "react-redux";
import { dispatchError } from "./utils/utils";
import web3 from "web3";

declare global {
  interface Window {
    ethereum?: any;
    web3?: any;
  }
}

const App: React.FC = () => {
  const w3 = new web3(
    `wss://goerli.infura.io/ws/v3/ef6c9e371703467fa91e5283048dfb70`
  );
  const termAbi: any = tAbi.abi;
  const indefiniteAbi: any = iAbi.abi; // Web3 is all over the place with types, only working solution is to cast to any
  const tokenAbi: any = tokAbi.abi;
  // setting states for account and contracts which will be passed to Context
  const [account, setAccount] = useState<string>();
  const [iContract, setiContract] = useState<contractType | null>();
  const [tContract, settContract] = useState<contractType | null>();
  const [token, setToken] = useState<contractType | null>();

  const [mobile, setMobile] = useState<boolean>();
  // detecting metamask account changes and refresing

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
    } else if (!window.ethereum) {
      setMobile(true);
    }
  }, [account]);

  // loading the term savings contract

  useEffect(() => {
    try {
      const tsavings = new w3.eth.Contract(
        termAbi,
        process.env.REACT_APP_GOERLI_TERM_ADDR
      );

      settContract(tsavings);
    } catch (err) {
      dispatchError(err.message);
    }
  }, []);

  // loading the indefinite savings contract

  useEffect(() => {
    try {
      const isavings = new w3.eth.Contract(
        indefiniteAbi,
        process.env.REACT_APP_GOERLI_INDEFINITE_ADDR
      );

      setiContract(isavings);
    } catch (err) {
      dispatchError(err.message);
    }
  }, []);
  useEffect(() => {
    try {
      const tokenContract = new w3.eth.Contract(
        tokenAbi,
        process.env.REACT_APP_GOERLI_TOKEN_ADDR
      );

      setToken(tokenContract);
    } catch (err) {
      dispatchError(err.message);
    }
  }, []);
  return (
    <Provider store={store}>
      <div className={classes.App}>
        <ConnContext.Provider
          value={{
            account: account!,
            tsavings: tContract!,
            isavings: iContract!,
            token: token!,
          }}
        >
          <WelcomeScreen
            setAccount={setAccount}
            mobile={mobile}
            setMobile={setMobile}
          />
        </ConnContext.Provider>
      </div>
    </Provider>
  );
};

export default App;
