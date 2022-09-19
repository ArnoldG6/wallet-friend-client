import {Navigate, useLocation} from "react-router-dom";

export default function BasicRedirect() {
    let location = useLocation();
    let access_token;
    let username;


    switch (location.pathname) {
        case "/":
            access_token = localStorage.getItem('access_token');
            username = localStorage.getItem('username');
            if (access_token && username) {
                return <Navigate to="/home"/>;
            }
            return <Navigate to="/auth"/>;
        default:
            return null;
    }
}