import {IUser} from "../../../../models/IUser.ts";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {axiosInstance} from "../../axiosInstance/axiosInstance.ts";
import axios from "axios";
interface SearchUsersResponse {
    users: IUser[];
}
export const searchUsers = createAsyncThunk<SearchUsersResponse, string, { rejectValue: string }>(
    'usersSlice/searchUsers',
    async (query: string, thunkAPI) => {
        try {
            const response = await axiosInstance.get(`auth/users/search?q=${query}`);
            return thunkAPI.fulfillWithValue({ users: response.data.users });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return thunkAPI.rejectWithValue(error.response?.data.message || 'Error');
            }
            return thunkAPI.rejectWithValue('An unknown error occurred');
        }
    }
);