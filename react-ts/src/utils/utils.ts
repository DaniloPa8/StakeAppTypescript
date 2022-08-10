import store from "../store";
import web3 from "web3";
import db from "./../firebase";
import { getDocs, doc, deleteDoc, collection } from "firebase/firestore";
import { errors } from "web3-core-helpers";
import { initalErrorType } from "../features/dataSlice";

import { Contract as ContractType } from "web3-eth-contract";
const inputError = errors.RevertInstructionError; // web3-core-helpers errors to get uniform errors accross the whole app

// getting a reference to firebase Collection
const userRef = collection(db, "Giveaway");

// helper function for dispatching error and passing
// data to the redux reducer
export const dispatchError = (reason: initalErrorType) => {
  store.dispatch({ type: "control/stopLoading" });

  store.dispatch({ type: "data/setErrorMessage", payload: reason });

  store.dispatch({ type: "control/openError" });
};

// helper function for dispatching tx results and passing
// data to the redux reducer

export const dispatchResult = (result: string) => {
  store.dispatch({ type: "data/setTxData", payload: result });

  store.dispatch({ type: "control/stopLoading" });

  store.dispatch({ type: "control/openReceipt" });
};

// helper function for firing errors

export const fireInputError = (msg: string) => {
  throw inputError(msg, "Error(String)");
};

// helper function for reducing the retrived numbers
// from blockchain to 2 decimals

export const normalizeNumber = (data: string) => {
  let result: string = web3.utils.fromWei(data);
  if (result.includes(".")) result = result.slice(0, result.indexOf(".") + 3);
  return result;
};

// function for checking input validity

export const checkInputs = (value: string | number, plan: number = 1) => {
  // Check other values
  if (typeof value === "string") parseInt(value);
  if (value <= 0 || value > 1000) return false;
  else if (plan <= 0 || plan > 3) return false;
  else return true;
};

// function for checking users balance before a transaction

export const checkBalance = async (
  inputAmount: number,
  caller: string,
  token: ContractType
) => {
  let balance: string = await token.methods.balanceOf(caller).call();
  if (inputAmount > parseInt(web3.utils.fromWei(balance))) {
    return false;
  } else return true;
};

// function for checking users allowance before a transaction

export const checkAllowance = async (
  inputAmount: number,
  caller: string,
  token: ContractType,
  target: string
) => {
  let allowance: string = await token.methods.allowance(caller, target).call();
  if (inputAmount > parseInt(web3.utils.fromWei(allowance))) {
    return false;
  } else return true;
};

// function for checking if user is already a staker

export const checkIsStaker = async (target: ContractType, caller: string) => {
  try {
    let result: boolean = await target.methods
      .isStaker()
      .call({ from: caller });
    return result;
  } catch (err) {
    //Nothing to do since revert string is not available on other calls
    //and error is handled in a different place
  }
};

// function for checking giveaway funds on contract before a transaction

export const checkGiveaway = async (target: ContractType) => {
  let result: string = await target.methods.getGiveawayPool().call();
  result = web3.utils.fromWei(result);
  if (parseInt(result) > 0) return true;
  else return false;
};

// function for filtering and deleting exipred entries for giveaways in database

export const filterAndDelete = async (account: string) => {
  // Setting the data after filtering to get the current state
  const data = await getDocs(userRef);
  let users = data.docs.map((doc) => ({
    ...doc.data(),
    // id: doc.id,
  }));

  let usersForDeletion: any[] = [];

  // Filtering the retrived documents to remove expired ones
  users.forEach((el, i) => {
    if (el.withdrawalTime < Date.now() / 1000 - 86400) {
      usersForDeletion.push(el);
      users.splice(i, 1);
    }
  });

  //Removing expired ones
  for (const el of usersForDeletion) {
    const userDoc = doc(db, "Giveaway", el.id);
    await deleteDoc(userDoc);
  }

  // Setting the current user from the remaining users, if present
  let currentUser = users.find(
    (el) => el.address.toLowerCase() === account.toString()
  );
  if (currentUser) return true;
};
