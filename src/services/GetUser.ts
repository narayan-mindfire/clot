import axios from "axios";
import { Alert } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useContext } from "react";
// import AuthContext from "../context/AuthContext";

// const curuser = useContext(AuthContext)

const API = axios.create({
    baseURL: 'https://dummyjson.com',
})

API.interceptors.request.use(
    async (config) => {
        try {
            const token = await AsyncStorage.getItem("token");
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
        } catch (error) {
            console.log("Error fetching token:", error);
        }
        return config;
    },
    (error) => {
        console.log(`Error occurred in request: ${error}`);
        return Promise.reject(error);
    }
);


export const getCurUser = async() => {
        try {
            const response = await API.get("/auth/me")
            
            if(response.data){
                await AsyncStorage.setItem("username", response.data.username)
                await AsyncStorage.setItem("email", response.data.email)
                await AsyncStorage.setItem("image", response.data.image)
                await AsyncStorage.setItem("firstName", response.data.firstName)
                await AsyncStorage.setItem("lastName", response.data.lastName)
            }
        } catch (error) {
            console.log(`received error : ${error}`)
        }
}


export default getCurUser