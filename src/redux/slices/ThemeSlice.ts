import { Theme } from "@react-navigation/native";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import darkTheme from "../../Themes/dark";
import lightTheme from "../../Themes/light";
interface ThemeState {
  theme: Theme;
  mode: "light" | "dark" | "auto"; 
}
const initialState: ThemeState = {
  theme: darkTheme, 
  mode: "auto", 
};
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<"light" | "dark" | "auto">) => {
        const thememode = action.payload
      state.mode = thememode; 
      if(thememode !== "auto"){
        thememode === "dark" ? state.theme = darkTheme : state.theme = lightTheme
      }
    },
    setSystemTheme: (state, action: PayloadAction<string>) => {
      if (state.mode === "auto") {
        action.payload === "dark" ? state.theme = darkTheme : state.theme = lightTheme
      }
    },
  },
});
export const { changeTheme, setSystemTheme } = themeSlice.actions;
export default themeSlice.reducer;
