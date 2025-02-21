import axios from "axios";

const LOGIN_API = 'https://dummyjson.com/auth/login'

interface userDataType {
    username: string,
    password: string
}

export const authFunction = async ({ username, password }: userDataType) => {
  try {
    console.log(`Received credentials: username: ${username}, password: ${password}`);
    
    const response = await axios.post(LOGIN_API, {
      username,
      password,
    });

    console.log("Login successful:");
    return response.data;
  } catch (error) {
    console.log("Login failed:", error);
    return null; 
  }
};
