import axios from "axios";

const baseURL = "http://localhost:3010";

export const api = axios.create({
    baseURL
});

export const loginUser = async (data: any) => {
    return api.post("/users/login", data);
}

export const registerUser = async (data: any) => {
    return api.post("/users/register", data);
}

export const shortenerLink = async (data: any) => {
    return api.post("/shortener", data);
}