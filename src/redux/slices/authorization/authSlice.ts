import {createSlice} from "@reduxjs/toolkit";
import {IUserAuth} from "../../../models/IUserWithAuth.ts";
import {loginUser} from "./services/loginUser.ts";
type AuthState = {
    isAuthenticated: boolean;
    user: IUserAuth | null;
    loadingAuth: boolean;
};
const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
const initialState: AuthState = {
    isAuthenticated: false,
    user: storedUser,
    loadingAuth: false
};
export const authSlice = createSlice({
    name: 'authSlice',
    initialState: initialState,
    reducers: {
        logoutUser: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem("user");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.isAuthenticated = true;
                state.user = payload;
                state.loadingAuth = false;
            })
            .addCase(loginUser.rejected, (state) => {
                state.isAuthenticated = false;
                state.user = null;
                state.loadingAuth = false;
            })
            .addCase(loginUser.pending, (state) => {
                state.loadingAuth = true;
            })


    }
});

export const loginUserActions = {
    ...authSlice.actions, loginUser
};