import axios from "axios";

const base_url = "http://localhost:3000/api/auth"

export const register = async(userData)=>{
    try{
        const response = await axios.post(`${base_url}/register`, userData);
        return response.data;
    }
    catch(err){
        throw err.response?.data || {message : "Registration failed"};
        
    }
}

export const login = async(data)=>{
    try{
        const response = await axios.post(`${base_url}/login`, data);
        return response.data;
    }
    catch(err){
        throw err.response?.data || {message : "login failed"};
    }
}

export const logout = () => {
  localStorage.removeItem("token");
};
