import axios from "axios";
import {retriveLocalStorage} from "../../../helpers/retriveLocalStorage.ts";
import {IUserAuth} from "../../../models/IUserWithAuth.ts";
export const axiosInstance = axios.create({
    baseURL: 'https://dummyjson.com/',
    headers: {},
});

axiosInstance.interceptors.request.use((requestObject) => {
    if (requestObject.method?.toUpperCase() === "GET"){
        requestObject.headers.Authorization = 'Bearer ' + retriveLocalStorage<IUserAuth>('user').accessToken

    }
    return requestObject
})


