import  SignUp from "../../../Types/User/user-SignUp.types";
import UserRequest from "../../Requests/user.request";

export default function signUpActions(values: any) {
    const data: SignUp = {username: values.username, password: values.confirmPassword,
        email: values.email, first_name:values.firstName, last_name: values.lastName};
    UserRequest.create(data);
}
