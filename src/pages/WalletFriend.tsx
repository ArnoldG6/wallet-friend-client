import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import BaseAuth from "./auth/BaseAuth";
import BaseHome from "./home/BaseHome";
import {MantineProvider} from "@mantine/core";

export default function WalletFriend() {
    return (
        <MantineProvider withGlobalStyles withNormalizeCSS theme={{colorScheme: 'dark'}}>
            <BrowserRouter>
                <Switch>
                    <Route path="/auth">
                        <BaseAuth/>
                    </Route>
                    <Route path="/home">
                        <BaseHome/>
                    </Route>
                    <Route exact path="/">
                        <Redirect to="/auth"/> {/* TODO: Validate if user is logged in or not */}
                    </Route>
                </Switch>
            </BrowserRouter>
        </MantineProvider>
    );
}