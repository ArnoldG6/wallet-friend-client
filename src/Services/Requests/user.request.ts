import http from "../../Middleware/http-common";
import UserFull from "../../Types/User/user-full.types";
import User from "../../Types/User/user.types";

class UserServices {
    get(username: string) {
        return http.get<User>(`/users/${username}`);
    }

    create(data: UserFull) {
        return http.post<User>("/users", data);
    }

    update(username: string, data: UserFull) {
        return http.put<any>(`/users/${username}`, data);
    }

    delete(username: string) {
        return http.delete<any>(`/users/${username}`);
    }
}

export default new UserServices();