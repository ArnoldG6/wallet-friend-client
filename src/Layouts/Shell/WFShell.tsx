import {AppShell, useMantineTheme} from "@mantine/core";
import WFHeader from "../Header/WFHeader";
import WFFooter from "../Footer/WFFooter";
import {useState} from "react";
import {Outlet} from "react-router-dom";
import BasicRedirect from "../../Routes/BasicRedirect";
import WFNavbar from "../NavBar/WFNavbar";

export default function WFShell() {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);


    return (
        <AppShell
            styles={{
                main: {
                    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2],
                },
            }}
            header={
                <WFHeader opened={opened} setOpened={setOpened}/>
            }
            footer={
                <WFFooter/>
            }
            navbar={
                <WFNavbar opened={opened}/>
            }
        >
            <BasicRedirect/>
            <Outlet/>
        </AppShell>
    );
}