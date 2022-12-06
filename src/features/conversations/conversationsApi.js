import { apiSlice } from "../api/apiSlice";
import { messageApi } from "../messages/messagesApi";
export const conversationsApi = apiSlice.injectEndpoints({
    endpoints:(build) => ({
        getConversations: build.query({
           query: (email) => `/conversations?participants_like=${email}&_sort=timestamp&_order=desc&_page=1&_limit=${process.env.REACT_APP_PER_PAGE_CONVERSATION}`
        }),
        getConversation: build.query({
           query: ({email, partnerEmail}) => `/conversations?participants_like=${email}-${partnerEmail}&&participants_like=${partnerEmail}-${email}`
        }),
        addConversation: build.mutation({
          query:({sender,data}) => ({
             url: '/conversations',
             method: 'POST',
             body: data
          }),
          async onQueryStarted(arg, {queryFulfilled, dispatch}){
             const conversation = await queryFulfilled;
             if(conversation?.data?.id){
               const users = arg.data.users;
               const senderEmail = users.find(user => user?.email === arg.sender);
               const receiverEmail = users.find(user => user?.email !== arg.sender);

               dispatch(messageApi.endpoints.addMessage.initiate({
                  conversationId: conversation.data.id,
                  sender: senderEmail,
                  receiver: receiverEmail,
                  message: arg.data.message,
                  timestamp: arg.data.timestamp
               }))
             }
          }
        }),
        updateConversation: build.mutation({
          query:({id, data, sender}) => ({
             url: `/conversations/${id}`,
             method: 'PATCH',
             body: data
          }),
             async onQueryStarted(arg, {queryFulfilled, dispatch}){

           const updateLocalData =  dispatch(apiSlice.util.updateQueryData('getConversations', arg.sender, (draft) => {
                       const draftConversation = draft.find(c => c.id == arg.id);
                       draftConversation.message = arg.data.message;
                       draftConversation.timestamp = arg.data.timestamp;
             }))

             try{
               const conversation = await queryFulfilled;
             if(conversation?.data?.id){
               const users = arg.data.users;
               const senderEmail = users.find(user => user?.email === arg.sender);
               const receiverEmail = users.find(user => user?.email !== arg.sender);

               dispatch(messageApi.endpoints.addMessage.initiate({
                  conversationId: conversation.data.id,
                  sender: senderEmail,
                  receiver: receiverEmail,
                  message: arg.data.message,
                  timestamp: arg.data.timestamp
               }))
             }
             }catch(err){
                updateLocalData.undo()
             }
          }
        }),

   })
});


export const {
   useGetConversationsQuery,
   useGetConversationQuery,
   useAddConversationMutation,
   useUpdateConversationMutation
   } = conversationsApi