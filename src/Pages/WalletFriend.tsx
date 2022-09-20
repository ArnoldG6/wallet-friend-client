import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import BaseAuth from "./Auth/BaseAuth";
import BaseHome from "./Home/BaseHome";
import WFShell from "../Layouts/Shell/WFShell";
import Login from "./Auth/Login/Login";
import SignUp from "./Auth/SignUp/SignUp";
import RequireAuth from "../Routes/RequireAuth";
import NotFound from "../Components/NotFound/NotFound";
import {ForgotPassword} from "./Auth/ForgotPassword/ForgotPassword";
import {ResetPassword} from "./Auth/PasswordReset/PasswordReset";


export default function WalletFriend() {
    let router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<WFShell/>} errorElement={<NotFound/>}>
                <Route path="auth" element={<BaseAuth/>} errorElement={<NotFound/>}>
                    <Route path="" element={<Login/>} errorElement={<NotFound/>} />
                    <Route path="login" element={<Login/>} errorElement={<NotFound/>}/>
                    <Route path="register" element={<SignUp/>} errorElement={<NotFound/>}/>
                    <Route path="*" element={<NotFound/>}/>
                    <Route path="forgot-password" element={<ForgotPassword/>} errorElement={<NotFound/>}/>
                    <Route path="password-reset/:token" element={<ResetPassword />} />
                </Route>
                <Route path="home" element={<RequireAuth> <BaseHome/> </RequireAuth>} errorElement={<NotFound/>}>
                    <Route path="" element={<RequireAuth> <div>main home</div> </RequireAuth>} errorElement={<NotFound/>}/>
                    <Route path="meme" element={<RequireAuth> <div>memes</div> </RequireAuth>} errorElement={<NotFound/>}/>
                </Route>
            </Route>
        )
    );

    return (
        <RouterProvider router={router}/>
    );
}