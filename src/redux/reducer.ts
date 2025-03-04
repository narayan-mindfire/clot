import AsyncStorage from "@react-native-async-storage/async-storage"
import { combineReducers } from "@reduxjs/toolkit"
import { persistReducer } from "redux-persist"
import createSecureStore from "redux-persist-expo-securestore"
import themeReducer from "./slices/ThemeSlice"
import productReducer from "./slices/ProductSlice"
import authReducer from "./slices/authSlice";

const themePersistConfig = {
    storage: AsyncStorage,
    key: "theme",
    whiteList: ["mode"]
  }
  
  const secureStorage = createSecureStore()
  
  const userPersistConfig = {
    storage: secureStorage,
    key: "auth",
    whiteList: ["user", "token"]
  }
  
  
  
  const rootReducer = combineReducers({
    auth: persistReducer(userPersistConfig, authReducer),
    theme: persistReducer(themePersistConfig, themeReducer),
    product: productReducer
  })
  
export default rootReducer