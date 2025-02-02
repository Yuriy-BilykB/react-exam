import {createAsyncThunk} from "@reduxjs/toolkit";
import {IRecipe} from "../../../../models/IRecipe.ts";
import axios from "axios";
import {axiosInstance} from "../../axiosInstance/axiosInstance.ts";
export const loadRecipesUser = createAsyncThunk<IRecipe[], string, { rejectValue: string }>(
    'recipesSlice/loadRecipesUser',
    async (userId: string, thunkAPI) => {
        try {
            const { data } = await axiosInstance.get(`auth/recipes`);
            const userRecipes = data.recipes.filter((recipe: IRecipe) => recipe.userId === Number(userId));
            return thunkAPI.fulfillWithValue(userRecipes);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return thunkAPI.rejectWithValue(error.response?.data.message || 'Error');
            }
            return thunkAPI.rejectWithValue('An unknown error occurred');
        }
    }
);