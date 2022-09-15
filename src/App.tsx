import WalletFriend from "./Pages/WalletFriend";
import {useState} from "react";
import {ColorScheme, ColorSchemeProvider, MantineProvider} from "@mantine/core";
import {NotificationsProvider} from "@mantine/notifications";

export default function App() {
    const [colorScheme, setColorScheme] = useState<ColorScheme>(localStorage.getItem('theme') === 'dark' ? 'dark' : 'light');

    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ?
                (() => {
                    localStorage.setItem('theme', 'light');
                    return 'light';
                })
                : (() => {
                    localStorage.setItem('theme', 'dark');
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