import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import BaseAuth from "./Auth/BaseAuth";
import BaseHome from "./Home/BaseHome";
import WFShell from "../Layouts/Shell/WFShell";
import Login from "./Auth/Login/Login";
import SignUp from "./Auth/SignUp/SignUp";
import RequireAuth from "../Routes/RequireAuth";

export default function WalletFriend() {
    let router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<WFShell/>}>
                <Route path="auth" element={<BaseAuth/>}>
                    <Route path="login" element={<Login/>}/>
                    <Route path="register" element={<SignUp/>}/>
                </Route>
                <Route path="home" element={<RequireAuth> <BaseHome/> </RequireAuth>}>
                    <Route path="meme" element={<RequireAuth> <div>memes</div> </RequireAuth>}/>
                </Route>
            </Route>
        )
    );

    return (
        <RouterProvider router={router}/>
    );
}