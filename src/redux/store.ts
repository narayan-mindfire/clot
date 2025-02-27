import counterReducer from "./slices/counterSlice"
import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/ThemeSlice"
export const store = configureStore({
    reducer:{
        counter: counterReducer,
        themeHandler: themeReducer,
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch