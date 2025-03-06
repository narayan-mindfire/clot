import { configureStore, Middleware } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { persistStore } from "redux-persist";
import rootReducer from "./reducer";
import { resetMiddleware } from "./middlewares/resetMiddleware";
import {apiSlice} from "./slices/apiSlice"

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(resetMiddleware, apiSlice.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
