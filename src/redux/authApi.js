import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3201/api/auth/"}),
    endpoints: (builder) => ({
        signInUser: builder.mutation({
            query: (data) => ({
                url: "registration",
                method: "POST",
                body: data,
            })
        }),
        logInUser: builder.mutation({
            query: (data) => ({
                url: "login",
                method: "POST",
                body: data,
                credentials: "include"
            })
        }),
        authenticateUser: builder.mutation({
            query: (data) => ({
                url: "auth",
                method: "POST",
                headers: { Authorization: `Berear ${data.token}`},
                credentials: "include"
            })
        }),
        refreshToken: builder.mutation({
            query: () => ({
                url: "refresh",
                method: "POST",
                credentials: "include"
            })
        }),
    })
})

export default authApi;
export const { useSignInUserMutation, useLogInUserMutation, useAuthenticateUserMutation, useRefreshTokenMutation } = authApi;