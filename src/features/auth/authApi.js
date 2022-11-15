import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
         register: builder.mutation({
              query: (data) => ({
                  url: '/register',
                  method: 'POST',
                  body: data,
              }),
              async onQueryStarted(arg, {queryFulfilled, dispatch}){
                 try{
                        const result = await queryFulfilled;
                        localStorage.setItem('auth', JSON.stringify({
                            accessToken: result.data.accessToken,
                            user: result.data.user
                        }));
                        dispatch(userLoggedIn(result))
                 }catch(err){
                     
                 }
              }
            }),
        login: builder.mutation({
            query: (data) => ({
                url: '/login',
                method: 'POST',
                body: data
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                       const result = await queryFulfilled;
                       const details = {
                        accessToken: result.data.accessToken,
                        user: result.data.user
                       }
                       localStorage.setItem('auth', JSON.stringify(details));
                       dispatch(userLoggedIn(details))
                }catch(err){
                    
                }
             }
        })
          
    })
});

export const {useLoginMutation, useRegisterMutation} = authApi