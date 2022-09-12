import http from "../../Middleware/http-common";
import Auth from "../../Types/Auth/auth.type";
import errorNotification from "../Utils/Notifications/error.util";
import successNotification from "../Utils/Notifications/success.util";
import {Cookies} from "react-cookie";

class AuthRequest {
    login(data: Auth) {
        http.post<any>("/users/authenticate", data)
            .then(function (response) {
                // handle success
                successNotification("Success", "You have successfully logged in!");
                const cookies = new Cookies();
                cookies.set("access_token", response.data.access_token, {path: "/", sameSite: "lax"});
                cookies.set("user_email", response.data.user.email, {path: "/", sameSite: "lax"});
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    errorNotification("Uh oh!", error.response.data.message);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    errorNotification("Uh oh!", "There was an error connecting to the server.");
                } else {
                    // Something happened in setting up the request that triggered an Error
                    errorNotification("Uh oh!", "There was an unexpected error.");
                }
            });
    }

    passwordReset(data: Auth) {
        return http.post<any>("/auth/password-reset", data);
    }
}

export default new AuthRequest();