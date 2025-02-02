import {createSlice } from "@reduxjs/toolkit";
import {IUser} from "../../../models/IUser.ts";
import {paginateUsers} from "./services/paginateUsers.ts";
import {searchUsers} from "./services/searchUsers.ts";
import {loadUser} from "./services/loadUser.ts";

type userSliceType = {
    users: IUser[];
    user: IUser | null;
    loadState: boolean;
    page: number;
    total: number;
};

const initialState: userSliceType = {
    users: [],
    user: null,
    loadState: false,
    page: 0,
    total: 0,
};

export const usersSlice = createSlice({
    name: 'userSlice',
    initialState: initialState,
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(paginateUsers.pending, (state) => {
                state.loadState = true;
            })
            .addCase(paginateUsers.fulfilled, (state, action) => {
                state.loadState = false;
                state.users = action.payload.users;
                state.total = action.payload.total;
            })
            .addCase(paginateUsers.rejected, (state) => {
                state.loadState = false;
                state.users = [];
            })
            .addCase(searchUsers.pending, (state) => {
                state.loadState = true;
            })
            .addCase(searchUsers.fulfilled, (state, action) => {
                state.loadState = false;
                state.users = action.payload.users;
            })
            .addCase(searchUsers.rejected, (state) => {
                state.loadState = false;
                state.users = [];
            })
            .addCase(loadUser.pending, (state) => {
                state.loadState = true;
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                state.loadState = false;
                state.user = action.payload;
            })
            .addCase(loadUser.rejected, (state) => {
                state.loadState = false;
                state.user = null;
            });
    }
});

export const userSliceActions = {
    ...usersSlice.actions,
    paginateUsers, searchUsers, loadUser
};
