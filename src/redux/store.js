import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import userApi from "./userApi";
import taskApi from "./taskApi";

export const store = configureStore({
    reducer: {
        user: userSlice,
        [userApi.reducerPath]: userApi.reducer,
        [taskApi.reducerPath]: taskApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware, taskApi.middleware),
})