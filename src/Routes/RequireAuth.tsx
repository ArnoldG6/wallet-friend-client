import {Navigate, useLocation} from "react-router-dom";
import React from "react";
import AuthRequest from "../Services/Requests/auth.request";

export default function RequireAuth({children}: { children: any }) {
    let location = useLocation();

    const isAuthenticated = () => {
        const access_token = localStorage.getItem('access_token');
        const username = localStorage.getItem('username');
        if (access_token && username) {
            console.log('access_token', access_token);
            console.log(AuthRequest.validateToken(username));
            return children;
        } else {
            // Clean localStorage to be safe
            localStorage.removeItem('access_token');
            localStorage.removeItem('username');
            return <Navigate to="/auth/login" state={{from: location}} replace/>;
        }
    }

    return isAuthenticated();
}