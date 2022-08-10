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
import { useState } from "react";
import classes from "./../styles/WelcomeScreen.module.css";
import Dashboard from "./Dashboard";
import logo from "./../images/logo2.jpg";
import { dispatchError } from "../utils/utils";
var WelcomeScreen = function (_a) {
    var setAccount = _a.setAccount, mobile = _a.mobile, setMobile = _a.setMobile;
    var _b = useState(false), connected = _b[0], setIsConnected = _b[1]; // state for managing if the user has connected his waller
    // connecting Metamask
    var window;
    var connMetamask = function () { return __awaiter(void 0, void 0, void 0, function () {
        var accounts, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!window.ethereum) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, window.ethereum.request({
                            method: "eth_requestAccounts",
                        })];
                case 2:
                    accounts = _a.sent();
                    setAccount(accounts[0]);
                    setIsConnected(true);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    dispatchError({ message: "9000 | User has not connected the account" });
                    return [3 /*break*/, 4];
                case 4: return [3 /*break*/, 6];
                case 5:
                    setMobile(true);
                    _a.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    }); };
    if (!connected) {
        return (_jsx(_Fragment, { children: _jsx("div", __assign({ className: classes.welcome_frame }, { children: _jsxs("div", __assign({ className: classes.welcome_content }, { children: [_jsxs("div", __assign({ className: classes.title }, { children: [_jsx("h1", __assign({ className: classes.title1 }, { children: "Welcome to -" })), _jsx("h1", __assign({ className: classes.title2 }, { children: "StakeApp\u24B8" }))] })), _jsx("img", { src: logo, className: classes.image }), !mobile && (_jsx("h3", __assign({ className: classes.text }, { children: "Please connect your Metamask wallet to continue" }))), mobile && (_jsx("h3", __assign({ className: classes.text }, { children: "YOU NEED TO USE A ETHEREUM-ENEABLED BROWSER EG. METAMASK BROWSER" }))), _jsx("button", __assign({ className: classes.button, onClick: connMetamask, disabled: mobile }, { children: "CONNECT" }))] })) })) }));
    }
    else if (connected) {
        return _jsx(Dashboard, {});
    }
    else
        return null;
};
export default WelcomeScreen;
