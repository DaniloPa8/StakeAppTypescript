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
import { jsx as _jsx } from "react/jsx-runtime";
import "./App.css";
var Contract = require("web3");
import tAbi from "./contracts/TermSavings.json";
import iAbi from "./contracts/IndefiniteSavings.json";
import tokenAbi from "./contracts/SavingsToken.json";
import WelcomeScreen from "./components/WelcomeScreen";
import ConnContext from "./components/Conn-context";
import { useEffect, useState } from "react";
var Provider = require("react-redux");
import store from "./store";
import { dispatchError } from "./utils/utils";
var App = function () {
    // setting states for account and contracts which will be passed to Context
    var _a = useState(), account = _a[0], setAccount = _a[1];
    var _b = useState(), iContract = _b[0], setiContract = _b[1];
    var _c = useState(), tContract = _c[0], settContract = _c[1];
    var _d = useState(), token = _d[0], setToken = _d[1];
    var _e = useState(), mobile = _e[0], setMobile = _e[1];
    // detecting metamask account changes and refresing
    var window;
    useEffect(function () {
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", function () {
                window.location.reload(false);
            });
        }
        else if (!window.ethereum) {
            setMobile(true);
        }
    }, [account]);
    // loading the term savings contract
    useEffect(function () {
        try {
            var tsavings = new Contract(tAbi.abi, process.env.REACT_APP_GOERLI_TERM_ADDR, { handleRevert: true });
            tsavings.setProvider("wss://goerli.infura.io/ws/v3/ef6c9e371703467fa91e5283048dfb70");
            console.log(tsavings);
            settContract(tsavings);
        }
        catch (err) {
            dispatchError(err.message);
        }
    }, []);
    // loading the indefinite savings contract
    useEffect(function () {
        try {
            var isavings = new Contract(iAbi.abi, process.env.REACT_APP_GOERLI_INDEFINITE_ADDR, { handleRevert: true });
            isavings.setProvider("wss://goerli.infura.io/ws/v3/ef6c9e371703467fa91e5283048dfb70");
            setiContract(isavings);
        }
        catch (err) {
            dispatchError(err.message);
        }
    }, []);
    useEffect(function () {
        try {
            var tokenContract = new Contract(tokenAbi.abi, process.env.REACT_APP_GOERLI_TOKEN_ADDR, { handleRevert: true });
            tokenContract.setProvider("wss://goerli.infura.io/ws/v3/ef6c9e371703467fa91e5283048dfb70");
            setToken(tokenContract);
        }
        catch (err) {
            dispatchError(err.message);
        }
    }, []);
    return (_jsx(Provider, __assign({ store: store }, { children: _jsx("div", __assign({ className: "App" }, { children: _jsx(ConnContext.Provider, __assign({ value: {
                    account: account,
                    tsavings: tContract,
                    isavings: iContract,
                    token: token,
                } }, { children: _jsx(WelcomeScreen, { setAccount: setAccount, mobile: mobile, setMobile: setMobile }) })) })) })));
};
export default App;
