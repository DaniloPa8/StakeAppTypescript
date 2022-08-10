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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useContext, useState, useEffect } from "react";
import classes from "./../styles/OwnerPanel.module.css";
import ConnContext from "./Conn-context";
import web3 from "web3";
import TermSelector from "./TermSelector";
import { useDispatch, useSelector } from "react-redux";
import { dispatchError, fireInputError, normalizeNumber } from "../utils/utils";
import sendTransaction from "../utils/sendTransaction";
var selectLoading = function (state) { return state.control.loading; };
var OwnerPanel = function (_a) {
    var closeModal = _a.closeModal, isOpen = _a.isOpen, setTerm = _a.setTerm, term = _a.term;
    var dispatch = useDispatch();
    //setting Redux states with the Selector
    var loading = useSelector(selectLoading);
    // Consuming the context
    var _b = useContext(ConnContext), account = _b.account, tsavings = _b.tsavings, isavings = _b.isavings, token = _b.token;
    // Setting states for input values
    var _c = useState(), inputAmount = _c[0], setInputAmount = _c[1];
    var _d = useState(), withdraw = _d[0], setWithdraw = _d[1];
    var _e = useState(), withAddr = _e[0], setWithAddr = _e[1];
    // Setting states for checking values
    var _f = useState(), giveawayPool = _f[0], setGiveawayPool = _f[1];
    var _g = useState(), balance = _g[0], setBalance = _g[1];
    // reset checked values when term changes
    useEffect(function () {
        setBalance("");
    }, [term]);
    // Helper for state reset
    var resetState = function () {
        setInputAmount("");
        setWithAddr("");
        setWithdraw("");
    };
    // function for calling the blockchain backend and funding & withdrawing from the contract
    var fundAndWithdraw = function (selector) { return __awaiter(void 0, void 0, void 0, function () {
        var target, action, amount, balance_1, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    target = term ? tsavings : isavings;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    dispatch({ type: "control/startLoading" });
                    action = void 0;
                    amount = null;
                    if (!(selector === "withdraw")) return [3 /*break*/, 2];
                    if (!withdraw)
                        fireInputError("No amount input.");
                    amount = web3.utils.toWei(withdraw, "ether");
                    if ((withAddr === null || withAddr === void 0 ? void 0 : withAddr.length) != 42)
                        fireInputError("Invalid address inputs.");
                    action = target.methods.withdrawContractFunds(withAddr.toString(), amount);
                    return [3 /*break*/, 4];
                case 2:
                    amount = web3.utils.toWei(inputAmount !== null && inputAmount !== void 0 ? inputAmount : "", "ether");
                    return [4 /*yield*/, token.methods
                            .balanceOf(account)
                            .call({ from: account })];
                case 3:
                    balance_1 = _a.sent();
                    if (amount > balance_1)
                        fireInputError("Insufficent balance of user account.");
                    action = target.methods.fundContract(amount);
                    _a.label = 4;
                case 4: return [4 /*yield*/, sendTransaction(action, target, account)];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 6:
                    err_1 = _a.sent();
                    dispatchError(err_1.reason);
                    return [3 /*break*/, 7];
                case 7:
                    resetState();
                    return [2 /*return*/];
            }
        });
    }); };
    // Function giving max allowance to the contract from the owner
    var giveAllowance = function () { return __awaiter(void 0, void 0, void 0, function () {
        var allowance, target, action;
        return __generator(this, function (_a) {
            try {
                dispatch({ type: "control/startLoading" });
                allowance = web3.utils.toWei("100000000", "ether");
                target = term
                    ? process.env.REACT_APP_GOERLI_TERM_ADDR
                    : process.env.REACT_APP_GOERLI_INDEFINITE_ADDR;
                action = token.methods.approve(target, allowance);
                sendTransaction(action, token, account);
            }
            catch (err) {
                dispatchError(err.reason);
            }
            return [2 /*return*/];
        });
    }); };
    // Function for funding and withdrawing from the Giveaway pool
    var giveaway = function (target) { return __awaiter(void 0, void 0, void 0, function () {
        var action;
        return __generator(this, function (_a) {
            try {
                dispatch({ type: "control/startLoading" });
                action = void 0;
                if (target === "fund")
                    action = isavings.methods.fundGiveaway();
                if (target === "withdraw")
                    action = isavings.methods.withdrawGiveaway();
                sendTransaction(action, isavings, account);
            }
            catch (err) {
                dispatchError(err.reason);
            }
            setGiveawayPool("");
            return [2 /*return*/];
        });
    }); };
    var checkGiveaway = function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, isavings.methods.getGiveawayPool().call()];
                case 1:
                    result = _a.sent();
                    result = normalizeNumber(result);
                    setGiveawayPool(result);
                    return [2 /*return*/];
            }
        });
    }); };
    var checkFunds = function () { return __awaiter(void 0, void 0, void 0, function () {
        var target, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    target = term ? tsavings : isavings;
                    return [4 /*yield*/, target.methods.getBalance().call({ from: account })];
                case 1:
                    result = _a.sent();
                    result = normalizeNumber(result);
                    setBalance(result);
                    return [2 /*return*/];
            }
        });
    }); };
    return (_jsx("div", { children: isOpen && (_jsxs(_Fragment, { children: [_jsx("div", { className: classes.overlay, onClick: function () { return closeModal(); } }), _jsxs("div", __assign({ className: "".concat(classes.modal, " ").concat(classes.animate_show) }, { children: [_jsxs("header", __assign({ className: classes.modal__header }, { children: [_jsx("h2", { children: "Owner panel" }), _jsx("button", __assign({ onClick: function () { return closeModal(); }, className: classes.closeButton }, { children: "\u00D7" }))] })), _jsxs("main", __assign({ className: classes.modal__main }, { children: [_jsx(TermSelector, { setTerm: setTerm, term: term }), _jsx("input", { className: classes.input, placeholder: "Desired amount to withdraw in SAT:", step: "0.01", min: "0", type: "number", value: withdraw !== null && withdraw !== void 0 ? withdraw : "", onChange: function (e) { return setWithdraw(e.target.value); } }), _jsx("input", { className: classes.input, placeholder: "Address to withdraw to:", type: "string", value: withAddr !== null && withAddr !== void 0 ? withAddr : "", onChange: function (e) { return setWithAddr(e.target.value); } }), _jsx("button", __assign({ disabled: loading, className: classes.button, onClick: function () { return fundAndWithdraw("withdraw"); } }, { children: "Withdraw funds" })), _jsx("input", { className: classes.input, placeholder: "Amount of funds to deposit in SAT:", step: "0.01", min: "0", type: "number", value: inputAmount !== null && inputAmount !== void 0 ? inputAmount : "", onChange: function (e) { return setInputAmount(e.target.value); } }), _jsx("button", __assign({ disabled: loading, className: classes.button, onClick: function () { return fundAndWithdraw("deposit"); } }, { children: "Fund the contract" })), _jsx("button", __assign({ className: classes.button, onClick: giveAllowance }, { children: "Give Max Allowance" })), _jsx("button", __assign({ className: "".concat(classes.button, " ").concat(classes.giveawayButton), onClick: checkGiveaway }, { children: "".concat(!giveawayPool
                                        ? "Check giveaway"
                                        : "".concat(giveawayPool, " SAT Tokens")) })), _jsx("button", __assign({ className: "".concat(classes.button, " ").concat(classes.fundsButton), onClick: checkFunds }, { children: "".concat(!balance ? "Check balance" : "".concat(balance, " SAT Tokens")) })), _jsx("button", __assign({ className: "".concat(classes.button, " ").concat(classes.fundButton), onClick: function () { return giveaway("fund"); } }, { children: "Fund Giveaway" })), _jsx("button", __assign({ className: "".concat(classes.button, " ").concat(classes.withdrawButton), onClick: function () { return giveaway("withdraw"); } }, { children: "Withdraw Giveaway" }))] }))] }))] })) }));
};
export default OwnerPanel;
