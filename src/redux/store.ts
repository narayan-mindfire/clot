import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import themeReducer from "./slices/ThemeSlice"
import productReducer from "./slices/ProductSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    themeHandler: themeReducer,
    productHandler: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

