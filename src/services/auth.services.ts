import http from "../http-common";
import Auth from "../types/Auth/auth.type";

class AuthServices {
    login(data: Auth) {
        return http.post<any>("/auth/login", data);
    }

    passwordReset(data: Auth) {
        return http.post<any>("/auth/password-reset", data);
    }
}

export default new AuthServices();