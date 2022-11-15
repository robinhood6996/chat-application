import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PublicRoute = ({children}) => {
    const isLoggedIn = useAuth()
    return !isLoggedIn ? children : <Navigate to={'/inbox'}/>
};

export default PublicRoute;