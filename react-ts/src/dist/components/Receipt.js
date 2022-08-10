var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import classes from "./../styles/Receipt.module.css";
import web3 from "web3";
import { useDispatch, useSelector } from "react-redux";
var txData = function (state) { return state.data.txData; };
var Receipt = function (_a) {
    var isOpen = _a.isOpen;
    var dispatch = useDispatch();
    //setting Redux states with the Selector
    var txDataObj = useSelector(txData);
    // Helper for closing and reseting receipt
    var close = function () {
        dispatch({ type: "control/closeReceipt" });
        dispatch({ type: "data/clearTxData" });
    };
    return (_jsx("div", { children: isOpen && (_jsxs(_Fragment, { children: [_jsx("div", { className: classes.overlay, onClick: close }), _jsxs("div", __assign({ className: classes.modal }, { children: [_jsxs("header", __assign({ className: classes.modal__header }, { children: [_jsx("h2", { children: "Succesful Transaction Recipt" }), _jsx("button", __assign({ onClick: close, className: classes.closeButton }, { children: "\u00D7" }))] })), _jsxs("main", __assign({ className: classes.modal__main }, { children: [_jsx("p", __assign({ className: classes.headText }, { children: "A succesful transaction has been recorded. The following paramaters were emitted:" })), _jsx("p", { children: txDataObj.sender && "Sender: ".concat(txDataObj.sender) }), _jsx("p", { children: txDataObj.plan && "Plan: ".concat(txDataObj.plan) }), _jsx("p", { children: txDataObj.depositedValue &&
                                        "Inital deposit value: ".concat(web3.utils.fromWei(txDataObj.depositedValue, "ether"), " SAT Tokens") }), _jsx("p", { children: txDataObj.withdrawnValue &&
                                        "Withdrawn value: ".concat(web3.utils.fromWei(txDataObj.withdrawnValue, "ether"), " SAT Tokens") }), _jsx("p", { children: txDataObj.depositTime &&
                                        "Inital deposit time: ".concat(new Date(parseInt(txDataObj.depositTime) * 1000).toLocaleString("en-us")) }), _jsx("p", { children: txDataObj.withdrawalTime &&
                                        "Withdrawal time: ".concat(new Date(parseInt(txDataObj.withdrawalTime) * 1000).toLocaleString("en-us")) }), _jsx("p", { children: txDataObj.totalIntrest &&
                                        "Total with intrest is: ".concat(web3.utils.fromWei(txDataObj.totalIntrest, "ether"), " SAT Tokens") }), _jsx("p", { children: txDataObj.time &&
                                        "Executed at: ".concat(new Date(parseInt(txDataObj.time) * 1000).toLocaleString("en-us")) }), _jsx("p", { children: txDataObj.allowanceAmount &&
                                        "Allowed the contract to spend ".concat(web3.utils.fromWei(txDataObj.allowanceAmount), " SAT Tokens.") }), _jsx("p", { children: txDataObj.giveawayFunds &&
                                        "Giveaway funds:  ".concat(web3.utils.fromWei(txDataObj.giveawayFunds), " SAT Tokens.") }), _jsx("p", { children: txDataObj.giveawayValue &&
                                        "You have been awared with:  ".concat(web3.utils.fromWei(txDataObj.giveawayValue), " SAT Tokens.") }), _jsx("p", { children: txDataObj.value &&
                                        "Allowance value: ".concat(web3.utils.fromWei(txDataObj.value), " SAT Tokens.") }), _jsx("p", { children: txDataObj.fundedValue &&
                                        "You have funded the contract with:\n                ".concat(web3.utils.fromWei(txDataObj.fundedValue), " SAT Tokens.") }), _jsx("p", { children: txDataObj.giveawayAmount &&
                                        "You have withdrawn ".concat(web3.utils.fromWei(txDataObj.giveawayAmount), " tokens from giveaway pool") }), _jsx("p", { children: txDataObj.message }), txDataObj.txHash && (_jsx("a", __assign({ className: classes.etherscan_link, target: "_blank", href: "https://goerli.etherscan.io/tx/".concat(txDataObj.txHash) }, { children: "Click here to see transaction details on Etherscan" })))] }))] }))] })) }));
};
export default Receipt;
