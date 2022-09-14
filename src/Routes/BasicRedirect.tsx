import {Navigate, useLocation} from "react-router-dom";

export default function BasicRedirect() {
    let location = useLocation();

    switch (location.pathname) {
        case "/":
            return <Navigate to="/auth"/>;
        case "/auth":
            return <Navigate to="/auth/login"/>;
        default:
            return null;
    }
}