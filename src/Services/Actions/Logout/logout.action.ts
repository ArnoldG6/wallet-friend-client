export default function logoutAction() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("username");
}