import AuthRequest from "../../Requests/auth.request";
import Auth from "../../../Types/Auth/auth.type";
import {sha256} from "js-sha256";

export default function loginAction(values: any) {
    const data: Auth = {username: values.email, password: sha256(values.password)};
    return AuthRequest.login(data);
}