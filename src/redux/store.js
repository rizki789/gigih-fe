import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./slices/tokenSlice";

export default configureStore({
    reducer: {
        token: tokenReducer,
    },
}); 