import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import taskApi from "./taskApi";
import authApi from "./authApi";
import userApi from "./userApi";

export const store = configureStore({
    reducer: {
        user: userSlice,
        [authApi.reducerPath]: authApi.reducer,
        [taskApi.reducerPath]: taskApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware, taskApi.middleware, userApi.middleware),
})