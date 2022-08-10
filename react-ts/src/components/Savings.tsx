import React, { useState, useContext } from "react";

import classes from "./../styles/Savings.module.css";

import TermSelector from "./TermSelector";

import ConnContext from "./Conn-context";

import web3 from "web3";

import {
  dispatchError,
  checkInputs,
  checkBalance,
  checkAllowance,
  fireInputError,
  checkIsStaker,
} from "../utils/utils";
import sendTransaction from "../utils/sendTransaction";

import { useDispatch, useSelector } from "react-redux";

const selectLoading = (state: any) => state.control.loading;

type SavingsProps = {
  closeSavings: () => void;
  setTerm: React.Dispatch<React.SetStateAction<boolean>>;
  term: boolean;
};

const Savings = ({ closeSavings, setTerm, term }: SavingsProps) => {
  //setting Redux states with the Selector

  const loading = useSelector(selectLoading);

  const { account, tsavings, isavings, token } = useContext(ConnContext); // consuming context

  const dispatch = useDispatch();

  // setting input states
  const [planState, setPlanState] = useState<number>(0);
  const [valueState, setValueState] = useState<number>(0);

  // helper for reseting state

  const resetState: () => void = () => {
    setPlanState(0);
    setValueState(0);
  };

  // function making a call to blockchain backend for starting savings

  const startSavings = async () => {
    // infered Contract type
    let target = term ? tsavings : isavings;
    let address: string | undefined = term
      ? process.env.REACT_APP_TERM_ADDR
      : process.env.REACT_APP_INDEFINITE_ADDR;
    try {
      dispatch({ type: "control/startLoading" });
      if (await checkIsStaker(target, account))
        fireInputError("You are already a staker!");
      if (!checkInputs(valueState, term ? planState : 1))
        fireInputError("Invalid inputs.");
      if (!(await checkBalance(valueState, account, token)))
        fireInputError("Insufficient balance of user account.");
      if (!(await checkAllowance(valueState, account, token, address!)))
        fireInputError(
          "Insufficient allowance of user account to the contract."
        );
      let action: () => void;
      let amount: string = web3.utils.toWei(valueState.toString(), "ether");
      if (!term) action = isavings.methods.newDeposit(amount);
      else action = tsavings.methods.newDeposit(planState, amount);
      sendTransaction(action, target, account);
    } catch (err) {
      dispatchError(err.reason);
    }

    resetState();
  };

  return (
    <div className={`${classes.open_savings} ${classes.animate_fade}`}>
      <TermSelector setTerm={setTerm} term={term} />

      {term && (
        <input
          placeholder="Choose your plan (1, 2 or 3)"
          min="1"
          max="3"
          type="number"
          step="1"
          value={planState ? planState : ""}
          onChange={(e) => setPlanState(parseInt(e.target.value))}
          className={classes.input}
        ></input>
      )}

      <input
        placeholder="Input the value you want to deposit (1 - 1000 SAT)"
        min="0.01"
        max="1000"
        type="number"
        step="0.01"
        className={classes.input}
        value={valueState ? valueState : ""}
        onChange={(e) => setValueState(parseInt(e.target.value))}
      ></input>

      <button
        disabled={loading}
        className={classes.close}
        onClick={() => closeSavings()}
      >
        Close
      </button>
      <button
        disabled={loading}
        className={classes.submit}
        onClick={() => startSavings()}
      >
        Start savings
      </button>
    </div>
  );
};

export default Savings;
