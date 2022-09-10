import http from "../../Middleware/http-common";
import Auth from "../../Types/Auth/auth.type";

class AuthRequest {
    login(data: Auth) {
        return http.post<any>("/auth/login", data);
    }

    passwordReset(data: Auth) {
        return http.post<any>("/auth/password-reset", data);
    }
}

export default new AuthRequest();