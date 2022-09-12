import {Redirect, Route} from "react-router-dom";
import {Cookies} from "react-cookie";
import React from "react";

export default function PrivateRoute({children, ...rest}: any) {
    const cookies = new Cookies();

    const isAuthenticated = () => {
        const access_token = cookies.get('access_token');
        const user_email = cookies.get('user_email');
        if (access_token && user_email) {
            //TODO: validate token with backend here
            return true;
        } else {
            // Clean cookies to be safe
            cookies.remove('access_token');
            cookies.remove('user_email');
            return false;
        }
    }

    return (
        <Route
            {...rest}
            render={({location}) =>
                isAuthenticated() ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/auth",
                            state: {from: location}
                        }}
                    />
                )
            }
        />
    );
}