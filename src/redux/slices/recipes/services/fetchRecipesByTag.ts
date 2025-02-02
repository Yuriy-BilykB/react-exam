import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import {axiosInstance} from "../../axiosInstance/axiosInstance.ts";
import {IRecipe} from "../../../../models/IRecipe.ts";

export const fetchRecipesByTag = createAsyncThunk<IRecipe[], string, { rejectValue: string }>(
    'recipes/fetchRecipesByTag',
    async (tag: string, thunkAPI) => {
        try {
            const {data}  = await axiosInstance.get(`auth/recipes/tag/${tag}`);
            return thunkAPI.fulfillWithValue(data.recipes)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return thunkAPI.rejectWithValue(error.response?.data.message || 'Error');
            }
            return thunkAPI.rejectWithValue('An unknown error occurred');
        }
    }
);