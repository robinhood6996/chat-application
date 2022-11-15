import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';
import authSlice from '../features/auth/authSlice';
import conversationsSlice from '../features/conversations/conversationsSlice';
import messagesSlice from '../features/messages/messagesSlice';

export const store = configureStore({
  reducer: { 
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    conversation: conversationsSlice,
    messages: messagesSlice
  },

  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
});
