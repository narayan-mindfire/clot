import axios from "axios";
import { Alert } from "react-native";

// import { useContext } from "react";
// import AuthContext from "../context/AuthContext";

// const curuser = useContext(AuthContext)

const API = axios.create({
    baseURL: 'https://dummyjson.com',
})

// API.interceptors.request.use(
//     (config) =>{
//         const token = curuser?.token
//         config.headers["Authorization"] = `Bearer ${token}`
//         return config
//     },
//     (error) => {
//         console.log(`error occured : ${error}`)
//         return Promise.reject(error)
//     }
// );


export const getCurUser = async(token:( string | null | undefined)) => {
    if(token){
        // console.log(`token received: ${token}`)
        try {
            const response = await API.get("/auth/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data;
        } catch (error) {
            console.log(`received error : ${error}`)
        }
    }
    else {
        Alert.alert("user doesn't exist / not logged in")
        return null
    }
}

export default getCurUser