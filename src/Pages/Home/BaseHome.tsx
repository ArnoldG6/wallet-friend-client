import {AppShell, useMantineTheme} from "@mantine/core";
import WFHeader from "../../Layouts/Header/WFHeader";
import WFFooter from "../../Layouts/Footer/WFFooter";
import WFNavbar from "../../Layouts/NavBar/WFNavbar";
import {useState} from "react";

export default function BaseHome() {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);

    return (
        <AppShell
            styles={{
                main: {
                    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2],
                },
            }}
            navbarOffsetBreakpoint="sm"
            navbar={
                <WFNavbar opened={opened}/>
            }
            header={
                <WFHeader opened={opened} setOpened={setOpened}/>
            }
            footer={
                <WFFooter/>
            }
        >
            <div>Home</div>
        </AppShell>
    );
}