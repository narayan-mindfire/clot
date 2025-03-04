import { Middleware } from "@reduxjs/toolkit";
import { logout } from "../slices/authSlice";
import { persistor } from "../store"; 

export const resetMiddleware: Middleware = () => (next) => (action) => {
  if (action.type === logout.type) {
    persistor.purge();
    console.log("Persisted state cleared");
  }
  return next(action);
};
