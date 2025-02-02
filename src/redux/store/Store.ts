import {configureStore} from "@reduxjs/toolkit";
import {authSlice} from "../slices/authorization/authSlice.ts";
import {usersSlice} from "../slices/users/usersSlice.tsx";
import {recipesSlice} from "../slices/recipes/recipesSlice.ts";
export const store = configureStore({
    reducer: {
        authSlice: authSlice.reducer,
        usersSlice: usersSlice.reducer,
        recipesSlice: recipesSlice.reducer,
    }
})