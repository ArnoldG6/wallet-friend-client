import {useLocation, useNavigate} from "react-router-dom";
import AuthRequest from "../Services/Requests/auth.request";
import {useEffect} from "react";

export default function RequireAuth({children}: { children: any }) {
    let location = useLocation();
    const navigate = useNavigate();

    const isAuthenticated = () => {
        const access_token = localStorage.getItem('access_token');
        const username = localStorage.getItem('username');
        if (access_token && username) {
            AuthRequest.validateToken(username)
                .catch(() => {
                    // Clean localStorage to be safe
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('username');
                    navigate('/auth/login', {replace: true, state: {from: location}});
                });
        } else {
            // Clean localStorage to be safe
            localStorage.removeItem('access_token');
            localStorage.removeItem('username');
            navigate('/auth/login', {replace: true, state: {from: location}});
        }
    }

    useEffect(() => {
        isAuthenticated();
    });

    return children;
}