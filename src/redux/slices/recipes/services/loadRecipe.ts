import {createAsyncThunk} from "@reduxjs/toolkit";
import {IRecipe} from "../../../../models/IRecipe.ts";
import axios from "axios";
import {axiosInstance} from "../../axiosInstance/axiosInstance.ts";

export const loadRecipe = createAsyncThunk<IRecipe, string, { rejectValue: string }>(
    "recipesSlice/loadRecipe",
    async (id, thunkAPI) => {
        try {
            const { data } = await axiosInstance.get<IRecipe>(`auth/recipes/${id}`);
            return thunkAPI.fulfillWithValue(data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return thunkAPI.rejectWithValue(error.response?.data.message || 'Error');
            }
            return thunkAPI.rejectWithValue('An unknown error occurred');
        }
    }
);