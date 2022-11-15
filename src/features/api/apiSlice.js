import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath:"api",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL,
        prepareHeaders: (headers, {getState, endpoints}) => {
            let token = getState().auth.accessToken;
            if(token){
                headers.set('Authorization', `${token}`)
            }
            return headers
        }
    }),
    tagTypes:[],
    endpoints:(build) => ({}),
    
})


