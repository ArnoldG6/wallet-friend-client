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
import {Earnings} from "./Home/Earnings/Earnings";
import React, {createContext, useState} from "react";
import User from "../Types/User/user.types";
import ToS from "./ToS/ToS";
import Account from "../Types/Account/account.types";
import Bags from "./Home/Bags/Bags";
import Bag from "./Home/Bags/Bag";

interface UserContextI {
    user: User | undefined,
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>
}

interface AccountContextI {
    account: Account | undefined,
    setAccount: React.Dispatch<React.SetStateAction<Account | undefined>>
}

export const UserContext = createContext<UserContextI>({} as UserContextI);

export const AccountContext = createContext<AccountContextI>({} as AccountContextI);

export default function WalletFriend() {
    const [user, setUser] = useState<User>();
    const [account, setAccount] = useState<Account>();

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
                    <Route path="categories" element={<Bags/>} errorElement={<NotFound/>}/>
                    <Route path="categories/:id" element={<Bag/>} errorElement={<NotFound/>}/>
                    <Route path="earnings" element={<Earnings/>} errorElement={<NotFound/>}/>
                    <Route path="expenses" element={<div>expenses</div>} errorElement={<NotFound/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Route>
                <Route path="tos" element={<ToS/>} errorElement={<NotFound/>}/>
            </Route>
        )
    );

    return (
        <UserContext.Provider value={{user, setUser}}>
            <AccountContext.Provider value={{account, setAccount}}>
                <RouterProvider router={router}/>
            </AccountContext.Provider>
        </UserContext.Provider>
    );
}