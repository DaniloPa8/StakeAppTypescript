var _a;
import { createSlice } from "@reduxjs/toolkit";
// creating a controlSlice that is used to control the behaviour of
// loading overlay, receipt and error modals as they need to be called
// from multiple places
var controlSlice = createSlice({
    name: "control",
    initialState: {
        loading: false,
        receiptOpen: false,
        errorOpen: false,
        waitingForInput: false,
    },
    reducers: {
        startLoading: function (state) {
            state.loading = true;
        },
        stopLoading: function (state) {
            state.loading = false;
        },
        startWaitingForInput: function (state) {
            state.waitingForInput = true;
        },
        stopWaitingForInput: function (state) {
            state.waitingForInput = false;
        },
        openReceipt: function (state) {
            state.receiptOpen = true;
        },
        closeReceipt: function (state) {
            state.receiptOpen = false;
        },
        openError: function (state) {
            state.errorOpen = true;
        },
        closeError: function (state) {
            state.errorOpen = false;
        },
    },
});
export var startLoading = (_a = controlSlice.actions, _a.startLoading), stopLoading = _a.stopLoading, startWaitingForInput = _a.startWaitingForInput, stopWaitingForInput = _a.stopWaitingForInput, openReceipt = _a.openReceipt, closeReceipt = _a.closeReceipt, openError = _a.openError, closeError = _a.closeError;
export default controlSlice.reducer;
