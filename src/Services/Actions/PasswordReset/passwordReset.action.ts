import AuthRequest from "../../Requests/auth.request";

export default function PasswordResetAction(values: any) {
    const data = {email: values.email};
    return AuthRequest.passwordReset(data);
}