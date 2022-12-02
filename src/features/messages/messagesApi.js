import { apiSlice } from "../api/apiSlice";

export const messageApi = apiSlice.injectEndpoints({
     endpoints:(builder) => ({
        getMessages: builder.query({
           query: (id) => `/messages?conversationId=${id}&_sort=timestamp&_order=desc&_page=1&_limit=${process.env.REACT_APP_PER_PAGE_CONVERSATION}`
        }),
          addMessage: builder.mutation({
            query: (data) => ({
                url: "/messages",
                method: "POST",
                body: data,
            }),
        }),
   })
})

export const {useGetMessagesQuery, useAddMessageMutation} = messageApi;