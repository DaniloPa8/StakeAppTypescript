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
import classes from "./../styles/Sidebar.module.css";
import menu from "./../images/menu.svg";
import token from "./../images/token.svg";
import manual from "./../images/book.svg";
import info from "./../images/info.svg";
import logout from "./../images/logout.svg";
import owner from "./../images/owner.svg";
var Sidebar = function (_a) {
    var menuHandler = _a.menuHandler, ownerHandler = _a.ownerHandler, tokenHandler = _a.tokenHandler, aboutHandler = _a.aboutHandler, manualHandler = _a.manualHandler, menuOpen = _a.menuOpen, isOwner = _a.isOwner;
    return (_jsxs(_Fragment, { children: [_jsxs("div", __assign({ className: menuOpen ? classes.sidebar_menu_cont_open : classes.sidebar_menu_cont }, { children: [_jsx("img", { src: menu, className: classes.sidebar_menu, onClick: menuHandler }), _jsx("p", __assign({ className: classes.menu_txt }, { children: " Menu " }))] })), _jsxs("div", __assign({ className: "".concat(classes.sidebar, " ").concat(classes.animate_fade, " ").concat(menuOpen ? classes.menu_open_mobile : "") }, { children: [menuOpen && (_jsx("div", __assign({ className: classes.sidebar_menu_close, onClick: menuHandler }, { children: _jsx("p", { children: "Close Menu" }) }))), _jsx("div", __assign({ className: classes.sidebar_comp }, { children: _jsx("p", { children: "StakeApp\u24B8" }) })), _jsxs("div", __assign({ className: classes.sidebar_token, onClick: isOwner ? ownerHandler : tokenHandler }, { children: [isOwner && _jsx("img", { src: owner, className: classes.sidebar_token_img }), !isOwner && (_jsx("img", { src: token, className: classes.sidebar_token_img }))] })), _jsx("div", __assign({ className: classes.sidebar_manual, onClick: manualHandler }, { children: _jsx("img", { src: manual, className: classes.sidebar_manual_img }) })), _jsx("div", __assign({ className: classes.sidebar_aboutUs, onClick: aboutHandler }, { children: _jsx("img", { src: info, className: classes.sidebar_info_img }) })), _jsx("div", __assign({ className: classes.sidebar_logout }, { children: _jsx("img", { src: logout, className: classes.sidebar_logout_img, onClick: function () { return window.location.reload(); } }) }))] }))] }));
};
export default Sidebar;
