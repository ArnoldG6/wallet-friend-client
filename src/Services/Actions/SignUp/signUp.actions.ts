import SignUp from "../../../Types/User/user-SignUp.types";
import UserRequest from "../../Requests/user.request";
import LoginAction from "../Login/login.action"

export default function signUpActions(values: any) {
    const dataSignUp: SignUp = {
        username: values.username, password: values.confirmPassword,
        email: values.email, first_name: values.firstName, last_name: values.lastName
    };
    return UserRequest.create(dataSignUp).then(success => {
        if (success) {
            const data = {email: values.email, username: values.email, password: values.confirmPassword};
            console.log(data);
            return LoginAction(data)
        }
    });

}
