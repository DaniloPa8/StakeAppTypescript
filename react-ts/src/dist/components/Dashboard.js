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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext, useState, useEffect } from "react";
import classes from "./../styles/Dashboard.module.css";
// Component imports
import Error from "./Error";
import Savings from "./Savings";
import Withdraw from "./Withdraw";
import Stop from "./Stop";
import GetSavings from "./GetSavings";
import OwnerPanel from "./OwnerPanel";
import Manual from "./Manual";
import AboutUs from "./AboutUs";
import ConnContext from "./Conn-context";
var LoadingOverlay = require("react-loading-overlay");
import Circle from "react-spinners/CircleLoader";
import Receipt from "./Receipt";
import Token from "./Token";
import Sidebar from "./Sidebar";
// -----------------
import { useSelector } from "react-redux";
import { dispatchError } from "../utils/utils";
// Getting the redux states
var selectLoading = function (state) { return state.control.loading; };
var selectReceipt = function (state) { return state.control.receiptOpen; };
var selectError = function (state) { return state.control.errorOpen; };
var selectInput = function (state) { return state.control.waitingForInput; };
var Dashboard = function () {
    //setting Redux states with the Selector
    var loading = useSelector(selectLoading);
    var openError = useSelector(selectError);
    var openReceipt = useSelector(selectReceipt);
    var waitingForInput = useSelector(selectInput);
    // Consuming the context
    var connectionContext = useContext(ConnContext);
    // Setting modal states
    var _a = useState(false), ownerOpen = _a[0], setOwnerOpen = _a[1];
    var _b = useState(false), manualOpen = _b[0], setManualOpen = _b[1];
    var _c = useState(false), aboutOpen = _c[0], setAboutOpen = _c[1];
    var _d = useState(false), tokenOpen = _d[0], setTokenOpen = _d[1];
    var _e = useState(false), menuOpen = _e[0], setMenuOpen = _e[1];
    // Setting the main div's state
    var _f = useState(0), selectedSection = _f[0], setSelectedSection = _f[1];
    // State for checking and displaying the owner modal button
    var _g = useState(false), isOwner = _g[0], setIsOwner = _g[1];
    // State for defining with witch contract to interact
    var _h = useState(true), term = _h[0], setTerm = _h[1];
    // UseEffect for checking if the current user is owner
    useEffect(function () {
        var _a;
        try {
            if (process.env.REACT_APP_OWNER_ADDR.toLowerCase() ===
                ((_a = connectionContext === null || connectionContext === void 0 ? void 0 : connectionContext.account) === null || _a === void 0 ? void 0 : _a.toLowerCase()))
                setIsOwner(true);
        }
        catch (err) {
            dispatchError(err.message);
        }
    }, []);
    // Savings section
    var savingsOpenHandler = function () {
        setSelectedSection(1);
        if (menuOpen)
            setMenuOpen(false);
    };
    // Withdraw section
    var withdrawOpenHandler = function () {
        setSelectedSection(2);
        if (menuOpen)
            setMenuOpen(false);
    };
    // Stop savings section
    var stopOpenHandler = function () {
        setSelectedSection(3);
        if (menuOpen)
            setMenuOpen(false);
    };
    // Get savings section
    var getOpenHandler = function () {
        setSelectedSection(4);
        if (menuOpen)
            setMenuOpen(false);
    };
    // Close handler
    var closeMainHandler = function () { return setSelectedSection(0); };
    // Owner panel section
    var ownerHandler = function () { return setOwnerOpen(function (prev) { return !prev; }); };
    // Token panel section
    var tokenHandler = function () { return setTokenOpen(function (prev) { return !prev; }); };
    // Manual modal section
    var manualHandler = function () { return setManualOpen(function (prev) { return !prev; }); };
    // About modal section
    var aboutHandler = function () { return setAboutOpen(function (prev) { return !prev; }); };
    //Mobile menu
    var menuHandler = function () {
        setMenuOpen(function (prev) { return !prev; });
        closeMainHandler();
    };
    return (
    // Overlay
    _jsx(LoadingOverlay, __assign({ active: loading, spinner: _jsx(Circle, { className: classes.loading_overlay_content }), text: "".concat(waitingForInput
            ? "Waiting for user to sign the transaction..."
            : "Waiting for transaction execution on blockchain. Please wait..."), className: "_loading_overlay_spinner" }, { children: _jsxs("div", __assign({ className: menuOpen ? classes.main_frame_menu_open : classes.main_frame }, { children: [_jsx(Sidebar, { menuHandler: menuHandler, ownerHandler: ownerHandler, tokenHandler: tokenHandler, aboutHandler: aboutHandler, manualHandler: manualHandler, menuOpen: menuOpen, isOwner: isOwner }), _jsxs("div", __assign({ className: classes.main_content }, { children: [selectedSection != 1 && (_jsx("div", __assign({ className: "".concat(classes.start_savings, " ").concat(classes.animate_fade), onClick: savingsOpenHandler }, { children: _jsx("span", { children: "Start savings" }) }))), selectedSection === 1 && (_jsx(Savings, { closeSavings: closeMainHandler, setTerm: setTerm, term: term })), selectedSection != 2 && (_jsx("div", __assign({ className: "".concat(classes.withdraw_savings, " ").concat(classes.animate_fade), onClick: withdrawOpenHandler }, { children: _jsx("p", { children: "Withdraw savings" }) }))), selectedSection === 2 && (_jsx(Withdraw, { closeWithdraw: closeMainHandler, setTerm: setTerm, term: term })), ownerOpen && (_jsx(OwnerPanel, { closeModal: ownerHandler, isOpen: ownerOpen, setTerm: setTerm, term: term })), tokenOpen && (_jsx(Token, { closeModal: tokenHandler, isOpen: tokenOpen, setTerm: setTerm, term: term })), manualOpen && (_jsx(Manual, { closeModal: manualHandler, isOpen: manualOpen })), aboutOpen && (_jsx(AboutUs, { closeModal: aboutHandler, isOpen: aboutOpen })), selectedSection != 3 && (_jsx("div", __assign({ className: "".concat(classes.stop_savings, " ").concat(classes.animate_fade), onClick: stopOpenHandler }, { children: _jsx("p", { children: "Stop savings" }) }))), selectedSection === 3 && _jsx(Stop, { closeStop: closeMainHandler }), selectedSection != 4 && (_jsx("div", __assign({ className: "".concat(classes.get_savings, " ").concat(classes.animate_fade), onClick: getOpenHandler }, { children: _jsx("p", { children: "Get savings details" }) }))), selectedSection === 4 && (_jsx(GetSavings, { closeGetSavings: closeMainHandler, setTerm: setTerm, term: term })), openReceipt && _jsx(Receipt, { isOpen: openReceipt }), openError && _jsx(Error, { isOpen: openError, term: term })] }))] })) })));
};
export default Dashboard;
