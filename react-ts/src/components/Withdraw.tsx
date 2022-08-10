import React, { useContext } from "react";
import classes from "./../styles/Withdraw.module.css";

import ConnContext from "./Conn-context";

import TermSelector from "./TermSelector";

import { checkIsStaker, dispatchError, fireInputError } from "../utils/utils";
import sendTransaction from "../utils/sendTransaction";

import { useDispatch, useSelector } from "react-redux";

const selectLoading = (state: any) => state.control.loading;

type WithdrawProps = {
  closeWithdraw: () => void;
  setTerm: React.Dispatch<React.SetStateAction<boolean>>;
  term: boolean;
};

const Withdraw = ({ closeWithdraw, setTerm, term }: WithdrawProps) => {
  const dispatch = useDispatch();

  //setting Redux states with the Selector

  const loading: boolean = useSelector(selectLoading);

  const { account, tsavings, isavings } = useContext(ConnContext); // consuming the context

  // function making a call to blockchain backend for withdrawing funds

  const withdraw = async () => {
    try {
      dispatch({ type: "control/startLoading" });

      let target = term ? tsavings : isavings;

      if (!(await checkIsStaker(target, account)))
        fireInputError("You are not a registered staker.");

      let action: () => void = target.methods.withdrawDeposit();

      sendTransaction(action, target, account);
    } catch (err) {
      dispatchError(err.reason);
    }
  };

  return (
    <div className={`${classes.withdraw_open} ${classes.animate_fade}`}>
      <TermSelector setTerm={setTerm} term={term} />
      <p className={classes.mid_txt}>
        Choose your savings option and withdraw funds along with a reward
      </p>
      <button disabled={loading} className={classes.submit} onClick={withdraw}>
        Withdraw savings
      </button>
      <button
        disabled={loading}
        className={classes.close}
        onClick={() => closeWithdraw()}
      >
        Close
      </button>
    </div>
  );
};

export default Withdraw;
