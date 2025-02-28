import counterReducer from "./slices/counterSlice"
import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/ThemeSlice"
import productReducer from "./slices/ProductSlice"
export const store = configureStore({
    reducer:{
        counter: counterReducer,
        themeHandler: themeReducer,
        products: productReducer
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch