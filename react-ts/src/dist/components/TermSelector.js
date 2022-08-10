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
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import classes from "./../styles/TermSelector.module.css";
var TermSelector = function (_a) {
    var setTerm = _a.setTerm, term = _a.term;
    return (_jsxs(_Fragment, { children: [_jsx("span", __assign({ className: "".concat(classes.title, " ").concat(term ? classes.choosenL : ""), onClick: function () { return setTerm(true); } }, { children: "Term savings" })), _jsx("span", __assign({ className: "".concat(classes.text, " ").concat(!term ? classes.choosenR : ""), onClick: function () { return setTerm(false); } }, { children: "Indefinite savings" }))] }));
};
export default TermSelector;
