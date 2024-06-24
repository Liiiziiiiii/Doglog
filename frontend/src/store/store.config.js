import {configureStore} from "@reduxjs/toolkit";

import authReducer from "./auth.slice";
import userReducer from "./user.slice";


const store = configureStore( {
    reducer: {
        authReducer,
        userReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),

})

export  default  store