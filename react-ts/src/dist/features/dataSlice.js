var _a;
import { createSlice } from "@reduxjs/toolkit";
var initalTx = {
    sender: null,
    depositedValue: null,
    withdrawnValue: null,
    fundedValue: null,
    plan: null,
    depositTime: null,
    withdrawalTime: null,
    totalIntrest: null,
    time: null,
    allowanceAmount: null,
    giveawayFunds: null,
    giveawayValue: null,
    giveawayAmount: null,
    txHash: null,
    message: null,
    value: null,
};
var initalError = {
    message: null,
    code: null,
    txHash: null,
};
var initalBlockData = {
    blockNumber: null,
    txHash: null,
};
// creating a data slice for handling the processing of
// succesful tranasaction data as well as error data
var dataSlice = createSlice({
    name: "data",
    initialState: {
        txData: initalTx,
        errorData: initalError,
        blockData: initalBlockData,
    },
    reducers: {
        setTxData: function (state, action) {
            state.txData = JSON.parse(action.payload);
        },
        clearTxData: function (state) {
            state.txData = initalTx;
        },
        // Handling error messages with custom error codes that have been
        // implemented in the contract itself using require and handleRevert
        setErrorMessage: function (state, action) {
            var data = action.payload.message;
            if (data && data.includes("|")) {
                var splitPoint = data.indexOf("|");
                var errorCode = data.slice(splitPoint - 6, splitPoint);
                state.errorData.code = parseInt(errorCode);
                var errorMessage = data.slice(splitPoint + 1);
                state.errorData.message = errorMessage;
            }
            else if (data.includes("inputs")) {
                state.errorData.message = "Invalid inputs.";
                state.errorData.code = 8000;
            }
            else if (data.includes("ERC")) {
                var message = data.slice(data.indexOf("ERC20:") + 7, -2);
                message = message.charAt(0).toUpperCase() + message.slice(1);
                state.errorData.message = "Token error: ".concat(message);
                state.errorData.code = 7555;
            }
            else if (!action.payload.message) {
                state.errorData.message = "Uknown error has occured.";
                state.errorData.code = 9999;
            }
            if (action.payload.txHash) {
                state.errorData.txHash = action.payload.txHash;
                state.errorData.message = action.payload.message;
            }
            else if (!action.payload.txData && action.payload.message)
                state.errorData.message = action.payload.message;
        },
        clearErrorMessage: function (state) {
            state.errorData = initalError;
        },
        setBlockData: function (state, action) {
            var number = action.payload.blockNum;
            var txHash = action.payload.transactionHash;
            state.blockData.blockNumber = number;
            state.blockData.txHash = txHash;
        },
        clearBlockData: function (state) {
            state.blockData = initalBlockData;
        },
    },
});
export var setTxData = (_a = dataSlice.actions, _a.setTxData), clearTxData = _a.clearTxData, setErrorMessage = _a.setErrorMessage, clearErrorMessage = _a.clearErrorMessage, setBlockData = _a.setBlockData, clearBlockData = _a.clearBlockData;
export default dataSlice.reducer;
