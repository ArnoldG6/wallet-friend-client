import {AppShell, Center, Grid, Image, MediaQuery, Stack, useMantineTheme} from "@mantine/core";
import BlackLogo from "../../assets/images/logos/Wallet-Friend-logos_black.png";
import WhiteLogo from "../../assets/images/logos/Wallet-Friend-logos_white.png";
import {MdPermIdentity} from "react-icons/md"
import {Route, Switch, useRouteMatch} from "react-router-dom";
import Login from "./login/Login";
import WF_Footer from "../components/WF_Footer";
//import WF_Footer from "../components/WF_Footer";

export default function BaseAuth() {
    const theme = useMantineTheme();
    let {path, url} = useRouteMatch()

    function logoTheme() {
        if (theme.colorScheme === 'dark') {
            return <Image src={WhiteLogo}/>;
        } else {
            return <Image src={BlackLogo}/>;
        }
    }

    function iconView(size: number) {
        return (
            <Switch>
                <Route path={`${url}/1`}>
                    <MdPermIdentity size={size}
                                    color={theme.colorScheme === 'dark' ? "white" : "black"}/>
                </Route>
            </Switch>
        );
    }

    return (
        <AppShell
            styles={{
                main: {
                    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                },
            }}
            footer={
                <WF_Footer/>
            }
        >
            { /* Desktop view */}
            <MediaQuery smallerThan="md" styles={{display: "none"}}>
                <Grid grow gutter="xl">
                    <Grid.Col span={6}>
                        <Stack align="center">
                            {logoTheme()}
                            {iconView(120)}
                        </Stack>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Center>
                            <Login/>
                        </Center>
                    </Grid.Col>
                </Grid>
            </MediaQuery>
            { /* Mobile view */}
            <MediaQuery largerThan="md" styles={{display: "none"}}>
                <Grid grow gutter="xl">
                    <Stack align="center">
                        {logoTheme()}
                        {iconView(50)}
                        <Login/>
                    </Stack>
                </Grid>
            </MediaQuery>

        </AppShell>
    );
}