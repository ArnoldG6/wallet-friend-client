import {Cookies} from "react-cookie";

export default function logoutAction() {
    const cookies = new Cookies();
    cookies.remove("access_token");
    cookies.remove("user_email");
    window.location.href = "/auth";
}