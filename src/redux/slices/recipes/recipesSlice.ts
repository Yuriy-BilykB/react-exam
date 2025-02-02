import {createSlice} from "@reduxjs/toolkit";
import {IRecipe} from "../../../models/IRecipe.ts";
import {loadRecipesUser} from "./services/loadRecipesUser.ts";
import {loadRecipes} from "./services/loadRecipes.ts";
import {loadRecipe} from "./services/loadRecipe.ts";
import {fetchRecipesByTag} from "./services/fetchRecipesByTag.ts";
type recipesSliceType = {
    recipes: IRecipe[];
    loadState: boolean;
    error: string | null;
    page: number;
    total: number
    recipe: IRecipe | null
};

const initialState: recipesSliceType = {
    recipes: [],
    loadState: false,
    error: null,
    page: 0,
    total: 0,
    recipe: null
};

export const recipesSlice = createSlice({
    name: "recipesSlice",
    initialState: initialState,
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loadRecipes.pending, (state) => {
                state.loadState = true;
                state.error = null;
            })
            .addCase(loadRecipes.fulfilled, (state, action) => {
                state.recipes = action.payload.recipes;
                state.total = action.payload.total
                state.loadState = false;
            })
            .addCase(loadRecipes.rejected, (state, action) => {
                state.loadState = false;
                state.error = action.payload as string;
            })
            .addCase(loadRecipesUser.pending, (state) => {
                state.loadState = true;
            })
            .addCase(loadRecipesUser.fulfilled, (state, action) => {
                state.loadState = false;
                state.recipes = action.payload;
            })
            .addCase(loadRecipesUser.rejected, (state) => {
                state.loadState = false;
            })
            .addCase(loadRecipe.pending, (state) => {
                state.loadState = true;
            })
            .addCase(loadRecipe.fulfilled, (state, action) => {
                state.loadState = false;
                state.recipe = action.payload;
            })
            .addCase(loadRecipe.rejected, (state) => {
                state.loadState = false;
            })
            .addCase(fetchRecipesByTag.pending, (state) => {
                state.loadState = true;
            })
            .addCase(fetchRecipesByTag.fulfilled, (state, action) => {
                state.loadState = false;
                state.recipes = action.payload;
                state.error = null;
            })
            .addCase(fetchRecipesByTag.rejected, (state, action) => {
                state.loadState = false;
                state.error = action.payload as string;
            });
    }
});
export const recipesSliceActions = {
    ...recipesSlice.actions, loadRecipes, loadRecipesUser, loadRecipe, fetchRecipesByTag
}