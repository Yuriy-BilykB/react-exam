import {createAsyncThunk} from "@reduxjs/toolkit";
import {IUserAuth} from "../../../../models/IUserWithAuth.ts";
import {axiosInstance} from "../../axiosInstance/axiosInstance.ts";
import axios from "axios";

export type LoginData = {
    username: string,
    password: string,
    expiresInMins?: number
}
export const loginUser = createAsyncThunk<IUserAuth, LoginData, { rejectValue: string }>(
    'auth/loginUser',
    async ({username, password, expiresInMins = 1}, thunkAPI) => {
        try {
            const {data: userWithTokens} = await axiosInstance.post('/user/login', {username,password, expiresInMins})
            localStorage.setItem('user', JSON.stringify({ ...userWithTokens}));
            return userWithTokens;
        }catch (error) {
            if (axios.isAxiosError(error)) {
                return thunkAPI.rejectWithValue(error.response?.data.message || 'Error');
            }
            return thunkAPI.rejectWithValue('An unknown error occurred');
        }
    }
);