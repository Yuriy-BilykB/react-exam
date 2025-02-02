import {IUser} from "../../../../models/IUser.ts";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {axiosInstance} from "../../axiosInstance/axiosInstance.ts";
import axios from "axios";
interface PaginateUsersResponse {
    users: IUser[];
    total: number;
}

export const paginateUsers = createAsyncThunk<PaginateUsersResponse, number, { rejectValue: string }>(
    'usersSlice/paginateUsers',
    async (page: number, thunkAPI) => {
        try {
            const limit = 30;
            const skip = page * limit;
            const response = await axiosInstance.get(`auth/users?limit=${limit}&skip=${skip}`);
            return thunkAPI.fulfillWithValue({ users: response.data.users, total: response.data.total })
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return thunkAPI.rejectWithValue(error.response?.data.message || 'Error');
            }
            return thunkAPI.rejectWithValue('An unknown error occurred');
        }
    }
);