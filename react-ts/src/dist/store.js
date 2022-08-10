import { configureStore } from "@reduxjs/toolkit";
import controlSlice from "./features/controlSlice";
import dataSlice from "./features/dataSlice";
var store = configureStore({
    reducer: {
        control: controlSlice,
        data: dataSlice,
    },
});
export default store;
