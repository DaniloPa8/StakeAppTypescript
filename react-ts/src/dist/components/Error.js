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
import classes from "./../styles/Error.module.css";
import { useDispatch, useSelector } from "react-redux";
var errorData = function (state) { return state.data.errorData; };
var Error = function (_a) {
    var isOpen = _a.isOpen, term = _a.term;
    var dispatch = useDispatch();
    //setting Redux states with the Selector
    var errorTxData = useSelector(errorData);
    // helper function for closing the error modal
    // and reseting the data to null
    var close = function () {
        dispatch({ type: "data/clearErrorMessage" });
        dispatch({ type: "control/closeError" });
    };
    return (_jsx("div", { children: isOpen && (_jsxs(_Fragment, { children: [_jsx("div", { className: classes.overlay, onClick: close }), _jsxs("div", __assign({ className: classes.modal }, { children: [_jsxs("header", __assign({ className: classes.modal__header }, { children: [_jsx("h2", { children: "Error message" }), _jsx("button", __assign({ onClick: close, className: classes.closeButton }, { children: "\u00D7" }))] })), _jsxs("main", __assign({ className: classes.modal__main }, { children: [_jsx("p", __assign({ className: classes.headText }, { children: "Transaction has encountered an error. Error has the message of:" })), _jsx("p", __assign({ className: classes.error_text }, { children: errorTxData.message })), process.env.REACT_APP_ENVIROMENT === "development" && (_jsx("p", { children: "Error code provided: ".concat(errorTxData.code) })), _jsx("div", __assign({ className: classes.eth_div }, { children: errorTxData.txHash && (_jsx("a", __assign({ className: classes.etherscan_link, href: "https://goerli.etherscan.io/tx/".concat(errorTxData.txHash), target: "_blank" }, { children: "Check transaction details here!" }))) }))] }))] }))] })) }));
};
export default Error;
