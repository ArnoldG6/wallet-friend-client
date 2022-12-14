import getAxiosInstance from "../../Middleware/http-common";
import UserFull from "../../Types/User/user-SignUp.types";
import UserSignUp from "../../Types/User/user-SignUp.types";
import User from "../../Types/User/user.types";
import successNotification from "../Utils/Notifications/success.util";
import errorNotification from "../Utils/Notifications/error.util";

class UserServices {
    get(username: string) {
        return getAxiosInstance().get<User>(`/users/${username}`);
    }

    create(data: UserSignUp) {
       return getAxiosInstance().post<any>("/users/register", data)
            .then(function (response) {
                // handle success
                successNotification("Success", "You have successfully registered your account!");
                return true;
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

    update(username: string, data: UserFull) {
        return getAxiosInstance().put<any>(`/users/${username}`, data);
    }

    delete(username: string) {
        return getAxiosInstance().delete<any>(`/users/${username}`);
    }
}

export default new UserServices();