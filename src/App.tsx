import {useCookies} from "react-cookie";
import WalletFriend from "./Pages/WalletFriend";
import {useState} from "react";
import {ColorScheme, ColorSchemeProvider, MantineProvider} from "@mantine/core";
import {NotificationsProvider} from "@mantine/notifications";

export default function App() {
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
                    <WalletFriend/>
                </NotificationsProvider>
            </MantineProvider>
        </ColorSchemeProvider>
    );
}