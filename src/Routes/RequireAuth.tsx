/* eslint-disable react-hooks/exhaustive-deps */
import {useLocation, useNavigate} from "react-router-dom";
import AuthRequest from "../Services/Requests/auth.request";
import {useCallback, useContext, useEffect} from "react";
import {UserContext, AccountContext} from "../Pages/WalletFriend";


export default function RequireAuth({children}: { children: any }) {
    let location = useLocation();
    const navigate = useNavigate();
    const {setUser} = useContext(UserContext);
    const {setAccount} = useContext(AccountContext);

    const isAuthenticated = useCallback(() => {
        const access_token = localStorage.getItem('access_token');
        const username = localStorage.getItem('username');
        if (access_token && username) {
            AuthRequest.validateToken(username)
                .then((response) => {
                    setUser(response.data.user);
                    setAccount(response.data.account);
                })
                .catch(() => {
                    // Clean localStorage to be safe
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('username');
                    setUser(undefined);
                    navigate('/auth/login', {replace: true, state: {from: location}});
                });
        } else {
            // Clean localStorage to be safe
            localStorage.removeItem('access_token');
            localStorage.removeItem('username');
            setUser(undefined);
            navigate('/auth/login', {replace: true, state: {from: location}});
        }
    }, []);

    useEffect(() => {
        isAuthenticated();
    }, [isAuthenticated]);

    return children;
}