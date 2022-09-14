import {Navigate, useLocation} from "react-router-dom";
import {Cookies} from "react-cookie";
import React from "react";

export default function RequireAuth({children}: { children: any }) {
    const cookies = new Cookies();
    let location = useLocation();

    const isAuthenticated = () => {
        const access_token = cookies.get('access_token');
        const user_email = cookies.get('user_email');
        if (access_token && user_email) {
            //TODO: validate token with backend here
            return children;
        } else {
            // Clean cookies to be safe
            cookies.remove('access_token');
            cookies.remove('user_email');
            return <Navigate to="/auth/login" state={{from: location}} replace/>;
        }
    }

    return isAuthenticated();
}