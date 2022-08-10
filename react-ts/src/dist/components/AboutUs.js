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
import classes from "./../styles/AboutUs.module.css";
import { FaLinkedin, FaGithubSquare } from "react-icons/fa";
var AboutUs = function (_a) {
    var closeModal = _a.closeModal, isOpen = _a.isOpen;
    return (_jsx("div", { children: isOpen && (_jsxs(_Fragment, { children: [_jsx("div", { className: classes.overlay, onClick: closeModal }), _jsxs("div", __assign({ className: "".concat(classes.modal, " ").concat(classes.animate_show) }, { children: [_jsxs("header", __assign({ className: classes.modal__header }, { children: [_jsx("h2", { children: "Savings manual" }), _jsx("button", __assign({ onClick: closeModal, className: classes.closeButton }, { children: "\u00D7" }))] })), _jsxs("main", __assign({ className: classes.modal__main }, { children: [_jsx("p", __assign({ className: classes.text }, { children: "StakeApp\u24B8 is a dApp designed to encourage transparaent and safe savings. Everything about the savings process is public and thus available on the blockchain for review. No hidden fees." })), _jsx("p", __assign({ className: classes.text }, { children: "Backend of this dApp lives on the Goerli Ethereum testnet with frontend in ReactJS. In this dApp these two systems achive seamless interaction, constantly communicating and exchanging data." })), _jsx("p", __assign({ className: classes.text }, { children: "This dApp is a demo, and a solo project done by @dev Danilo Pavi\u0107evi\u0107. Check out my socials below." })), _jsxs("div", __assign({ className: classes.socials }, { children: [_jsx("a", __assign({ href: "https://github.com/DaniloPa8", target: "_blank" }, { children: _jsx(FaGithubSquare, { className: classes.icon1 }) })), _jsx("a", __assign({ href: "https://www.linkedin.com/in/danilo-pavicevic-8a3a2215b/", target: "_blank" }, { children: _jsx(FaLinkedin, { className: classes.icon2 }) }))] }))] }))] }))] })) }));
};
export default AboutUs;
