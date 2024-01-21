import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:3201/api/user/"}),
    endpoints: (builder) => ({
        uploadImage: builder.mutation({
            query: (data) => ({
                url: "upload-image",
                method: "POST",
                headers: {Authorization: "Berear " + localStorage.getItem("token")},
                body: data,
            })
        }),
    })
})

export default userApi;
export const { useUploadImageMutation, useUpdateDataMutation } = userApi;