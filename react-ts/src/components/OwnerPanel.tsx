import React, { useContext, useState, useEffect } from "react";

import classes from "./../styles/OwnerPanel.module.css";

import ConnContext from "./Conn-context";

import web3 from "web3";

import TermSelector from "./TermSelector";

import { useDispatch, useSelector } from "react-redux";

import { dispatchError, fireInputError, normalizeNumber } from "../utils/utils";
import sendTransaction from "../utils/sendTransaction";

const selectLoading = (state: any) => state.control.loading;

type OwnerPanelProps = {
  closeModal: () => void;
  isOpen: boolean;
  setTerm: React.Dispatch<React.SetStateAction<boolean>>;
  term: boolean;
};

const OwnerPanel = ({ closeModal, isOpen, setTerm, term }: OwnerPanelProps) => {
  const dispatch = useDispatch();

  //setting Redux states with the Selector

  const loading = useSelector(selectLoading);

  // Consuming the context

  const { account, tsavings, isavings, token } = useContext(ConnContext);

  // Setting states for input values

  const [inputAmount, setInputAmount] = useState<string | null>();
  const [withdraw, setWithdraw] = useState<string | null>();
  const [withAddr, setWithAddr] = useState<string | null>();

  // Setting states for checking values

  const [giveawayPool, setGiveawayPool] = useState<string | null>();
  const [balance, setBalance] = useState<string | null>();

  // reset checked values when term changes

  useEffect(() => {
    setBalance("");
  }, [term]);
  // Helper for state reset

  const resetState = () => {
    setInputAmount("");
    setWithAddr("");
    setWithdraw("");
  };

  // function for calling the blockchain backend and funding & withdrawing from the contract

  const fundAndWithdraw = async (selector: string) => {
    let target = term ? tsavings : isavings;

    try {
      dispatch({ type: "control/startLoading" });

      let action: () => void;
      let amount: Object | null = null;

      if (selector === "withdraw") {
        if (!withdraw) fireInputError("No amount input.");
        amount = web3.utils.toWei(withdraw!, "ether");

        if (withAddr?.length !== 42) fireInputError("Invalid address inputs.");

        action = target.methods.withdrawContractFunds(
          withAddr!.toString(),
          amount
        );
      } else {
        amount = web3.utils.toWei(inputAmount ?? "", "ether");

        //Quick check for token balance for easy error handling
        let balance = await token.methods
          .balanceOf(account)
          .call({ from: account });

        if (amount > balance)
          fireInputError("Insufficent balance of user account.");

        action = target.methods.fundContract(amount);
      }

      await sendTransaction(action, target, account);
    } catch (err) {
      dispatchError(err.reason);
    }
    resetState();
  };

  // Function giving max allowance to the contract from the owner

  const giveAllowance = async () => {
    try {
      dispatch({ type: "control/startLoading" });
      let allowance = web3.utils.toWei("100000000", "ether");
      let target = term
        ? process.env.REACT_APP_GOERLI_TERM_ADDR
        : process.env.REACT_APP_GOERLI_INDEFINITE_ADDR;

      let action = token.methods.approve(target, allowance);

      sendTransaction(action, token, account);
    } catch (err) {
      dispatchError(err.reason);
    }
  };

  // Function for funding and withdrawing from the Giveaway pool

  const giveaway = async (target: string) => {
    try {
      dispatch({ type: "control/startLoading" });

      let action;
      if (target === "fund") action = isavings.methods.fundGiveaway();
      if (target === "withdraw") action = isavings.methods.withdrawGiveaway();

      sendTransaction(action, isavings, account);
    } catch (err) {
      dispatchError(err.reason);
    }
    setGiveawayPool("");
  };

  const checkGiveaway = async () => {
    console.log(isavings);
    console.log(account);
    console.log(tsavings);
    let result: string = await isavings.methods.getGiveawayPool().call();

    result = normalizeNumber(result);

    setGiveawayPool(result);
  };
  const checkFunds = async () => {
    let target = term ? tsavings : isavings;
    let result = await target.methods.getBalance().call({ from: account });
    result = normalizeNumber(result);
    setBalance(result);
  };

  return (
    <div>
      {isOpen && (
        <>
          <div className={classes.overlay} onClick={() => closeModal()}></div>

          <div className={`${classes.modal} ${classes.animate_show}`}>
            <header className={classes.modal__header}>
              <h2>Owner panel</h2>

              <button
                onClick={() => closeModal()}
                className={classes.closeButton}
              >
                &times;
              </button>
            </header>

            <main className={classes.modal__main}>
              <TermSelector setTerm={setTerm} term={term} />

              <input
                className={classes.input}
                placeholder="Desired amount to withdraw in SAT:"
                step="0.01"
                min="0"
                type="number"
                value={withdraw ?? ""}
                onChange={(e) => setWithdraw(e.target.value)}
              ></input>

              <input
                className={classes.input}
                placeholder="Address to withdraw to:"
                type="string"
                value={withAddr ?? ""}
                onChange={(e) => setWithAddr(e.target.value)}
              ></input>

              <button
                disabled={loading}
                className={classes.button}
                onClick={() => fundAndWithdraw("withdraw")}
              >
                Withdraw funds
              </button>

              <input
                className={classes.input}
                placeholder="Amount of funds to deposit in SAT:"
                step="0.01"
                min="0"
                type="number"
                value={inputAmount ?? ""}
                onChange={(e) => setInputAmount(e.target.value)}
              ></input>

              <button
                disabled={loading}
                className={classes.button}
                onClick={() => fundAndWithdraw("deposit")}
              >
                Fund the contract
              </button>
              <button className={classes.button} onClick={giveAllowance}>
                Give Max Allowance
              </button>
              <button
                className={`${classes.button} ${classes.giveawayButton}`}
                onClick={checkGiveaway}
              >
                {`${
                  !giveawayPool
                    ? "Check giveaway"
                    : `${giveawayPool} SAT Tokens`
                }`}
              </button>
              <button
                className={`${classes.button} ${classes.fundsButton}`}
                onClick={checkFunds}
              >
                {`${!balance ? "Check balance" : `${balance} SAT Tokens`}`}
              </button>
              <button
                className={`${classes.button} ${classes.fundButton}`}
                onClick={() => giveaway("fund")}
              >
                Fund Giveaway
              </button>
              <button
                className={`${classes.button} ${classes.withdrawButton}`}
                onClick={() => giveaway("withdraw")}
              >
                Withdraw Giveaway
              </button>
            </main>
          </div>
        </>
      )}
    </div>
  );
};

export default OwnerPanel;
