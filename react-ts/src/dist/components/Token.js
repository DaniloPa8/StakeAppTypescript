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
import { useState, useContext, useEffect } from "react";
import classes from "./../styles/Token.module.css";
import ConnContext from "./Conn-context";
import TermSelector from "./TermSelector";
import web3 from "web3";
import { dispatchError, checkInputs, filterAndDelete, checkGiveaway, fireInputError, normalizeNumber, } from "../utils/utils";
import sendTransaction from "../utils/sendTransaction";
import db from "./../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
// Setting database, state slice and a custom inputError
var selectLoading = function (state) { return state.control.loading; };
var userRef = collection(db, "Giveaway");
var Token = function (_a) {
    var closeModal = _a.closeModal, isOpen = _a.isOpen, setTerm = _a.setTerm, term = _a.term;
    var dispatch = useDispatch();
    //setting Redux states with the Selector
    var loading = useSelector(selectLoading);
    var _b = useContext(ConnContext), account = _b.account, token = _b.token, isavings = _b.isavings, tsavings = _b.tsavings; // consuming the context
    // setting state
    var _c = useState(false), disableButton = _c[0], setDisableButton = _c[1];
    var _d = useState(null), balance = _d[0], setBalance = _d[1];
    var _e = useState(null), allowanceCheck = _e[0], setAllowanceCheck = _e[1];
    var _f = useState(), allowance = _f[0], setAllowance = _f[1];
    // useEffect for filtering the databse when component mounts
    useEffect(function () {
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, filterAndDelete(account !== null && account !== void 0 ? account : "")];
                    case 1:
                        if (_a.sent())
                            setDisableButton(true);
                        return [2 /*return*/];
                }
            });
        }); });
    }, []);
    useEffect(function () {
        setAllowanceCheck("");
        setBalance("");
    }, [term]);
    // function for calling the blockchain backend and giving allowance to the contract
    var giveAllowance = function () { return __awaiter(void 0, void 0, void 0, function () {
        var address, amount, action;
        return __generator(this, function (_a) {
            address = term
                ? process.env.REACT_APP_GOERLI_TERM_ADDR
                : process.env.REACT_APP_GOERLI_INDEFINITE_ADDR;
            try {
                dispatch({ type: "control/startLoading" });
                if (!checkInputs(allowance !== null && allowance !== void 0 ? allowance : ""))
                    fireInputError("Invalid inputs.");
                amount = web3.utils.toWei(allowance, "ether");
                action = token.methods.approve(address, amount);
                sendTransaction(action, token, account);
            }
            catch (err) {
                dispatchError(err.reason);
            }
            setAllowance("");
            setAllowanceCheck("");
            return [2 /*return*/];
        });
    }); };
    // function for getting giveaway funds
    var giveawayHandler = function () { return __awaiter(void 0, void 0, void 0, function () {
        var action, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dispatch({ type: "control/startLoading" });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, filterAndDelete(account)];
                case 2:
                    if (_a.sent()) {
                        setDisableButton(true);
                        fireInputError("Only one givaway is available every 24h per user.");
                    }
                    return [4 /*yield*/, checkGiveaway(isavings)];
                case 3:
                    if (!(_a.sent()))
                        fireInputError("No giveaway funds currently available, try again later.");
                    return [4 /*yield*/, addDoc(userRef, {
                            address: account,
                            withdrawalTime: Math.floor(Date.now() / 1000),
                            attempts: 0,
                        })];
                case 4:
                    _a.sent();
                    action = isavings.methods.giveaway();
                    sendTransaction(action, isavings, account);
                    return [3 /*break*/, 6];
                case 5:
                    err_1 = _a.sent();
                    dispatchError(err_1.reason);
                    return [3 /*break*/, 6];
                case 6:
                    setBalance("");
                    return [2 /*return*/];
            }
        });
    }); };
    // quick balance call to contract
    var balanceHanlder = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, token.methods.balanceOf(account).call({ from: account })];
                case 1:
                    res = _a.sent();
                    res = normalizeNumber(res);
                    setBalance(res);
                    return [2 /*return*/];
            }
        });
    }); };
    var allowanceHandler = function () { return __awaiter(void 0, void 0, void 0, function () {
        var target, address, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    target = term ? tsavings : isavings;
                    address = term
                        ? process.env.REACT_APP_TERM_ADDR
                        : process.env.REACT_APP_INDEFINITE_ADDR;
                    return [4 /*yield*/, token.methods.allowance(account, address).call()];
                case 1:
                    res = _a.sent();
                    res = normalizeNumber(res);
                    setAllowanceCheck(res);
                    return [2 /*return*/];
            }
        });
    }); };
    return (_jsx("div", { children: isOpen && (_jsxs(_Fragment, { children: [_jsx("div", { className: classes.overlay, onClick: closeModal }), _jsxs("div", __assign({ className: "".concat(classes.modal, " ").concat(classes.animate_show) }, { children: [_jsxs("header", __assign({ className: classes.modal__header }, { children: [_jsx("h2", { children: "Token panel" }), _jsx("button", __assign({ onClick: closeModal, className: classes.closeButton }, { children: "\u00D7" }))] })), _jsxs("main", __assign({ className: classes.modal__main }, { children: [_jsx(TermSelector, { setTerm: setTerm, term: term }), _jsx("input", { className: "".concat(classes.inputAllowance, " ").concat(classes.input), placeholder: "Amount of tokens to allow to the contract: 1 - 1000", step: "0.01", min: "0", max: "1000", type: "number", value: allowance !== null && allowance !== void 0 ? allowance : "", onChange: function (e) { return setAllowance(e.target.value); } }), _jsx("button", __assign({ disabled: loading, className: "".concat(classes.button, " ").concat(classes.buttonAllowance), onClick: giveAllowance }, { children: "Give allowance" })), _jsx("button", __assign({ onClick: balanceHanlder, className: "".concat(classes.button, " ").concat(classes.buttonCheckAllowance) }, { children: "".concat(balance === "" ? "Check my balance" : "".concat(balance, " SAT Tokens")) })), _jsx("button", __assign({ onClick: allowanceHandler, className: "".concat(classes.button, " ").concat(classes.buttonCheckBalance) }, { children: "".concat(allowanceCheck === ""
                                        ? "Check my allowance"
                                        : "".concat(allowanceCheck, " SAT Tokens")) })), _jsx("p", __assign({ className: "".concat(classes.text, " ").concat(classes.textGiveaway) }, { children: "Everyone is able to get 100 tokens a day from the giveaway!" })), _jsx("button", __assign({ className: "".concat(classes.button, " ").concat(classes.buttonGiveaway), onClick: giveawayHandler, disabled: disableButton }, { children: "CLAIM GIVEAWAY" }))] }))] }))] })) }));
};
export default Token;
