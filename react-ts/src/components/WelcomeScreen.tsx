import { useState } from "react";
import classes from "./../styles/WelcomeScreen.module.css";

import Dashboard from "./Dashboard";

import logo from "./../images/logo2.png";

import { dispatchError } from "../utils/utils";

type WelcomeScreenProps = {
  setAccount: (prevState: string) => void;
  mobile: boolean | undefined;
  setMobile: (prevState: boolean) => void;
};

const WelcomeScreen = ({
  setAccount,
  mobile,
  setMobile,
}: WelcomeScreenProps) => {
  const [connected, setIsConnected] = useState<boolean>(false); // state for managing if the user has connected his waller

  // connecting Metamask

  const connMetamask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        setIsConnected(true);
      } catch (error) {
        dispatchError({ message: "9000 | User has not connected the account" });
      }
    } else {
      setMobile(true);
    }
  };

  if (!connected) {
    return (
      <>
        <div className={classes.welcome_frame}>
          <div className={classes.welcome_content}>
            <div className={classes.title}>
              <h1 className={classes.title1}>Welcome to -</h1>
              <h1 className={classes.title2}>StakeAppⒸ</h1>
            </div>

            <img src={logo} className={classes.image} alt="" />

            {!mobile && (
              <h3 className={classes.text}>
                Please connect your Metamask wallet to continue
              </h3>
            )}
            {mobile && (
              <h3 className={classes.text}>
                YOU NEED TO USE A ETHEREUM-ENEABLED BROWSER EG. METAMASK BROWSER
              </h3>
            )}

            <button
              className={classes.button}
              onClick={connMetamask}
              disabled={mobile}
            >
              CONNECT
            </button>
          </div>
        </div>
      </>
    );
  } else if (connected) {
    return <Dashboard />;
  } else return null;
};

export default WelcomeScreen;
