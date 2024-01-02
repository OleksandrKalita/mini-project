import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const userApi = createApi({
    reducerPath: "userApi",
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
            })
        }),
        authenticateUser: builder.mutation({
            query: (data) => ({
                url: "auth",
                method: "POST",
                headers: { Autherization: `Berear ${data.token}`}
            })
        }),
    })
})

export default userApi;
export const { useSignInUserMutation, useLogInUserMutation, useAuthenticateUserMutation } = userApi;