import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        isAuth: false,
        user: {}
    },
    reducers: {
        login: (state, action) => {
            state.isAuth = true;
            state.user = action.payload;
        },
        logout: (state) => {
            state.isAuth = false;
            state.user = {};
        },
    }
})

export default userSlice.reducer;
export const { login, logout } = userSlice.actions;