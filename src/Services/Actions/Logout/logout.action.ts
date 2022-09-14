import {Cookies} from "react-cookie";

export default function logoutAction() {
    const cookies = new Cookies();
    cookies.remove("access_token", {path: "/", sameSite: "lax"});
    cookies.remove("user_email", {path: "/", sameSite: "lax"});
}