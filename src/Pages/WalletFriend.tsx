import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import BaseAuth from "./Auth/BaseAuth";
import BaseHome from "./Home/BaseHome";
import {ColorScheme, ColorSchemeProvider, MantineProvider} from "@mantine/core";
import {useState} from "react";
import {NotificationsProvider} from "@mantine/notifications";
import {useCookies} from "react-cookie";
import PrivateRoute from "../Routes/PrivateRoute";

export default function WalletFriend() {
    const [cookies, setCookie] = useCookies(['theme']);
    const [colorScheme, setColorScheme] = useState<ColorScheme>(cookies.theme);

    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ?
                (() => {
                    setCookie('theme', 'light', {path: '/', sameSite: 'lax'});
                    return 'light';
                })
                : (() => {
                    setCookie('theme', 'dark', {path: '/', sameSite: 'lax'});
                    return 'dark';
                })
        ));

    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider withGlobalStyles withNormalizeCSS theme={{colorScheme}}>
                <NotificationsProvider>
                    <BrowserRouter>
                        <Switch>
                            <Route path="/auth/*">
                                <BaseAuth/>
                            </Route>
                            <PrivateRoute path="/home/*">
                                <BaseHome/>
                            </PrivateRoute>
                            <Route exact path="/">
                                <Redirect to="/auth"/> {/* TODO: Validate if user is logged in or not */}
                            </Route>
                        </Switch>
                    </BrowserRouter>
                </NotificationsProvider>
            </MantineProvider>
        </ColorSchemeProvider>
    );
}