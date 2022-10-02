import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import BaseAuth from "./Auth/BaseAuth";
import BaseHome from "./Home/BaseHome";
import WFShell from "../Layouts/Shell/WFShell";
import Login from "./Auth/Login/Login";
import SignUp from "./Auth/SignUp/SignUp";
import RequireAuth from "../Routes/RequireAuth";
import NotFound from "../Components/NotFound/NotFound";
import {ForgotPassword} from "./Auth/ForgotPassword/ForgotPassword";
import Home from "./Home/Landing/Home";
import {ResetPassword} from "./Auth/PasswordReset/PasswordReset";
import React, {createContext, useState} from "react";
import User from "../Types/User/user.types";

interface UserContextI {
    user: User | undefined,
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>
}

export const UserContext = createContext<UserContextI>({} as UserContextI);

export default function WalletFriend() {
    const [user, setUser] = useState<User>();

    let router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<WFShell/>} errorElement={<NotFound/>}>
                <Route path="auth" element={<BaseAuth/>} errorElement={<NotFound/>}>
                    <Route path="" element={<Login/>} errorElement={<NotFound/>}/>
                    <Route path="login" element={<Login/>} errorElement={<NotFound/>}/>
                    <Route path="register" element={<SignUp/>} errorElement={<NotFound/>}/>
                    <Route path="forgot-password" element={<ForgotPassword/>} errorElement={<NotFound/>}/>

                    <Route path="reset_password/:token" element={<ResetPassword/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Route>
                <Route path="home" element={<RequireAuth> <BaseHome/> </RequireAuth>} errorElement={<NotFound/>}>
                    <Route path="" element={<Home/>} errorElement={<NotFound/>}/>
                    <Route path="categories" element={<div>categories</div>} errorElement={<NotFound/>}/>
                    <Route path="earnings" element={<div>earnings</div>} errorElement={<NotFound/>}/>
                    <Route path="expenses" element={<div>expenses</div>} errorElement={<NotFound/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Route>
            </Route>
        )
    );

    return (
        <UserContext.Provider value={{user, setUser}}>
            <RouterProvider router={router}/>
        </UserContext.Provider>
    );
}