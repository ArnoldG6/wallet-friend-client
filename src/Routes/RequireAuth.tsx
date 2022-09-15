import {Navigate, useLocation} from "react-router-dom";
import React from "react";

export default function RequireAuth({children}: { children: any }) {
    let location = useLocation();

    const isAuthenticated = () => {
        const access_token = localStorage.getItem('access_token');
        const username = localStorage.getItem('username');
        if (access_token && username) {
            //TODO: validate token with backend here
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