import AuthRequest from "../../Requests/auth.request";

export default function PasswordResetAction(values: any) {
    const data = {email: values.email};
    console.log(data);
    return AuthRequest.passwordReset(data);
}