import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import pointerReducer from "../features/pointerSlice/pointerSlice";
import loginReducer from "../features/authSlice/authSlice";

export default configureStore({
    reducer: {
        pointer: pointerReducer,
        login: loginReducer,
        // [authApi.reducerPath]: authApi.reducer,
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false
    })
});

// setupListeners(store.dispatch)