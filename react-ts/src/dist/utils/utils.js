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
import store from "../store";
import web3 from "web3";
import db from "./../firebase";
import { getDocs, doc, deleteDoc, collection } from "firebase/firestore";
import { errors } from "web3-core-helpers";
var inputError = errors.RevertInstructionError; // web3-core-helpers errors to get uniform errors accross the whole app
// getting a reference to firebase Collection
var userRef = collection(db, "Giveaway");
// helper function for dispatching error and passing
// data to the redux reducer
export var dispatchError = function (reason) {
    store.dispatch({ type: "control/stopLoading" });
    store.dispatch({ type: "data/setErrorMessage", payload: reason });
    store.dispatch({ type: "control/openError" });
};
// helper function for dispatching tx results and passing
// data to the redux reducer
export var dispatchResult = function (result) {
    store.dispatch({ type: "data/setTxData", payload: result });
    store.dispatch({ type: "control/stopLoading" });
    store.dispatch({ type: "control/openReceipt" });
};
// helper function for firing errors
export var fireInputError = function (msg) {
    throw inputError(msg, "Error(String)");
};
// helper function for reducing the retrived numbers
// from blockchain to 2 decimals
export var normalizeNumber = function (data) {
    var result = web3.utils.fromWei(data);
    if (result.includes("."))
        result = result.slice(0, result.indexOf(".") + 3);
    return result;
};
// function for checking input validity
export var checkInputs = function (value, plan) {
    if (plan === void 0) { plan = 1; }
    // Check other values
    if (typeof value === "string")
        parseInt(value);
    if (value <= 0 || value > 1000)
        return false;
    else if (plan <= 0 || plan > 3)
        return false;
    else
        return true;
};
// function for checking users balance before a transaction
export var checkBalance = function (inputAmount, caller, token) { return __awaiter(void 0, void 0, void 0, function () {
    var balance;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, token.methods.balanceOf(caller).call()];
            case 1:
                balance = _a.sent();
                if (inputAmount > parseInt(web3.utils.fromWei(balance))) {
                    return [2 /*return*/, false];
                }
                else
                    return [2 /*return*/, true];
                return [2 /*return*/];
        }
    });
}); };
// function for checking users allowance before a transaction
export var checkAllowance = function (inputAmount, caller, token, target) { return __awaiter(void 0, void 0, void 0, function () {
    var allowance;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, token.methods.allowance(caller, target).call()];
            case 1:
                allowance = _a.sent();
                if (inputAmount > parseInt(web3.utils.fromWei(allowance))) {
                    return [2 /*return*/, false];
                }
                else
                    return [2 /*return*/, true];
                return [2 /*return*/];
        }
    });
}); };
// function for checking if user is already a staker
export var checkIsStaker = function (target, caller) { return __awaiter(void 0, void 0, void 0, function () {
    var result, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, target.methods
                        .isStaker()
                        .call({ from: caller })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
            case 2:
                err_1 = _a.sent();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// function for checking giveaway funds on contract before a transaction
export var checkGiveaway = function (target) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, target.methods.getGiveawayPool().call()];
            case 1:
                result = _a.sent();
                result = web3.utils.fromWei(result);
                if (parseInt(result) > 0)
                    return [2 /*return*/, true];
                else
                    return [2 /*return*/, false];
                return [2 /*return*/];
        }
    });
}); };
// function for filtering and deleting exipred entries for giveaways in database
export var filterAndDelete = function (account) { return __awaiter(void 0, void 0, void 0, function () {
    var data, users, usersForDeletion, _i, usersForDeletion_1, el, userDoc, currentUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getDocs(userRef)];
            case 1:
                data = _a.sent();
                users = data.docs.map(function (doc) { return (__assign({}, doc.data())); });
                usersForDeletion = [];
                // Filtering the retrived documents to remove expired ones
                users.forEach(function (el, i) {
                    if (el.withdrawalTime < Date.now() / 1000 - 86400) {
                        usersForDeletion.push(el);
                        users.splice(i, 1);
                    }
                });
                _i = 0, usersForDeletion_1 = usersForDeletion;
                _a.label = 2;
            case 2:
                if (!(_i < usersForDeletion_1.length)) return [3 /*break*/, 5];
                el = usersForDeletion_1[_i];
                userDoc = doc(db, "Giveaway", el.id);
                return [4 /*yield*/, deleteDoc(userDoc)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5:
                currentUser = users.find(function (el) { return el.address.toLowerCase() === account.toString(); });
                if (currentUser)
                    return [2 /*return*/, true];
                return [2 /*return*/];
        }
    });
}); };
