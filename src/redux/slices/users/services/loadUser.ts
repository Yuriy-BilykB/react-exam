import {createAsyncThunk} from "@reduxjs/toolkit";
import {IUser} from "../../../../models/IUser.ts";
import {axiosInstance} from "../../axiosInstance/axiosInstance.ts";
import axios from "axios";
export const loadUser = createAsyncThunk<IUser, string, { rejectValue: string }>(
    'usersSlice/loadUser',
    async (id: string, thunkAPI) => {
        try {
            const { data } = await axiosInstance.get(`auth/users/${id}`);
            return thunkAPI.fulfillWithValue(data)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return thunkAPI.rejectWithValue(error.response?.data.message || 'Error');
            }
            return thunkAPI.rejectWithValue('An unknown error occurred');
        }
    }
);