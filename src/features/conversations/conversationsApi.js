import { apiSlice } from "../api/apiSlice";

export const conversationsApi = apiSlice.injectEndpoints({
    endpoints:(build) => ({
        getConversation: build.query({
           query: (email) => `/conversations?participants_like=${email}&
                              _sort=timestamp&_order=desc&_page=1&
                              _limit=${process.env.REACT_APP_PER_PAGE_CONVERSATION}`
        })
   })
});


export const {useGetConversationQuery} = conversationsApi