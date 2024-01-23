import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const taskApi = createApi({
    reducerPath: "taskApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:3201/api/task/"}),
    endpoints: (builder) => ({
        createTask: builder.mutation({
            query: (data) => ({
                url: "create",
                method: "POST",
                headers: {Authorization: `Berear ${data.token}`},
                body: data.task,
            })
        }),
        getTasks: builder.mutation({
            query: () => ({
                url: "get",
                method: "GET",
                headers: {Authorization: "Berear " + localStorage.getItem("token")}
            })
        }),
        changeTaskStatus: builder.mutation({
            query: (data) => ({
                url: "update-status",
                method: "POST",
                headers: {Authorization: "Berear " + localStorage.getItem("token")},
                body: {
                    taskId: data.taskId,
                    newStatus: data.status,
                }
            })
        })
    })
});

export default taskApi;
export const { useCreateTaskMutation, useGetTasksMutation, useChangeTaskStatusMutation } = taskApi;