import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import BaseAuth from "./auth/BaseAuth";
import BaseHome from "./home/BaseHome";
import {ColorScheme, ColorSchemeProvider, MantineProvider} from "@mantine/core";
import {useState} from "react";
import {useHotkeys} from "@mantine/hooks";

export default function WalletFriend() {
    const [colorScheme, setColorScheme] = useState<ColorScheme>("light");

    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    useHotkeys([['mod+J', () => toggleColorScheme()]]);
    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider withGlobalStyles withNormalizeCSS theme={{colorScheme}}>
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
        </ColorSchemeProvider>
    );
}