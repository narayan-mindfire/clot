import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import {persistStore, persistReducer} from "redux-persist"
import themeReducer from "./slices/ThemeSlice"
import productReducer from "./slices/ProductSlice"
import AsyncStorage from "@react-native-async-storage/async-storage";
import createSecureStore from "redux-persist-expo-securestore"


const themePersistConfig = {
  storage: AsyncStorage,
  key: "theme"
}

const secureStorage = createSecureStore()
const userPersistConfig = {
  storage: secureStorage,
  key: "user"
}

const rootReducer = combineReducers({
  auth: persistReducer(userPersistConfig, authReducer),
  themeHandler: persistReducer(themePersistConfig, themeReducer),
  productHandler: productReducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
});

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

