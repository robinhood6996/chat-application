import { apiSlice } from "../api/apiSlice";

export const conversationsApi = apiSlice.injectEndpoints({
    endpoints:(build) => ({
        getConversations: build.query({
           query: (email) => `/conversations?participants_like=${email}&_sort=timestamp&_order=desc&_page=1&_limit=${process.env.REACT_APP_PER_PAGE_CONVERSATION}`
        }),
        getConversation: build.query({
           query: ({email, partnerEmail}) => `/conversations?participants_like=${email}-${partnerEmail}&&participants_like=${partnerEmail}-${email}`
        }),
        addConversation: build.mutation({
          query:(data) => ({
             url: '/conversations',
             method: 'POST',
             body: data
          })
        }),
        updateConversation: build.mutation({
          query:({id, data}) => ({
             url: `/conversations/${id}`,
             method: 'PATCH',
             body: data
          })
        }),

   })
});


export const {
   useGetConversationsQuery,
   useGetConversationQuery,
   useAddConversationMutation,
   useUpdateConversationMutation
   } = conversationsApi