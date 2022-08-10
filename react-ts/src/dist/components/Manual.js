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
import classes from "./../styles/Manual.module.css";
var Manual = function (_a) {
    var closeModal = _a.closeModal, isOpen = _a.isOpen;
    return (_jsx("div", { children: isOpen && (_jsxs(_Fragment, { children: [_jsx("div", { className: classes.overlay, onClick: closeModal }), _jsxs("div", __assign({ className: "".concat(classes.modal, " ").concat(classes.animate_show) }, { children: [_jsxs("header", __assign({ className: classes.modal__header }, { children: [_jsx("h2", { children: "Savings manual" }), _jsx("button", __assign({ onClick: closeModal, className: classes.closeButton }, { children: "\u00D7" }))] })), _jsxs("main", __assign({ className: classes.modal__main }, { children: [_jsx("p", { children: "To start app intreaction, user should go to the Token modal, and get some tokens from the giveaway (which is available once every 24h per address), small amount of Goerli tesnet ETH is also required which can be obtained at one of many faucets available. Also it is REQUIRED to give allowance to the contract, the amount of which depends on how much you want to stake." }), _jsx("p", { children: "Upon selecting the 'start savings' option User can decide upon term or non-term savings." }), _jsx("p", { children: "Term savings need to be locked for a predefined period of time (1 , 2 or 3 minutes) and cant be withdrawn before that period expires." }), _jsx("p", { children: "Non-term savings can be stopped at any time but reward is also smaller." }), _jsx("p", { children: "User needs to choose their savings method, value and period of lockup if needed. Savings can be started with 'start savings' button. User can then check on their current savings by opening the 'get savings' section, where all details can be retrived." }), _jsx("p", { children: "When in term savings User can withdraw their funds+reward after the choosen period has expired by opening the 'withdraw savings' section." }), _jsx("p", { children: "Non-term savings can also be withdrawn this way at any point in time." }), _jsx("p", { children: "Term savings Users can also forcefully stop their term savings in the 'stop savings' section, but this carries the penalty of not reciving the reward and a 5% intrest penalty of the deposited funds being kept by the StakeApp." })] }))] }))] })) }));
};
export default Manual;
