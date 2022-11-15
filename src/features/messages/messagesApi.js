import { apiSlice } from "../api/apiSlice";

export const messageApi = apiSlice.injectEndpoints({
     endpoints:(build) => ({
        getMessages: build.query({
           query: (id) => `/messages?conversationId=${id}&_sort=timestamp&_order=desc&_page=1&_limit=${process.env.REACT_APP_PER_PAGE_CONVERSATION}`
        })
   })
});

export const {useGetMessagesQuery} = messageApi;