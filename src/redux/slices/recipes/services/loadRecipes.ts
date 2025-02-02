import {IRecipe} from "../../../../models/IRecipe.ts";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {axiosInstance} from "../../axiosInstance/axiosInstance.ts";
interface LoadRecipesResponse {
    recipes: IRecipe[];
    total: number;
}
export const loadRecipes = createAsyncThunk<LoadRecipesResponse, number, { rejectValue: string }>(
    'recipesSlice/loadPosts',
    async (page: number, thunkAPI ) => {
        try {
            const limit = 20;
            const skip = page * limit;
            const response = await axiosInstance.get(`auth/recipes?limit=${limit}&skip=${skip}`);
            return thunkAPI.fulfillWithValue({recipes: response.data.recipes, total: response.data.total });
        }catch (error) {
            if (axios.isAxiosError(error)) {
                return thunkAPI.rejectWithValue(error.response?.data.message || 'Error');
            }
            return thunkAPI.rejectWithValue('An unknown error occurred');
        }
    }
);