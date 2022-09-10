import {AppShell, Box, Center, Grid, Image, MediaQuery, Stack, useMantineTheme} from "@mantine/core";
import BlackLogo from "../../assets/images/logos/Wallet-Friend-logos_black.png";
import WhiteLogo from "../../assets/images/logos/Wallet-Friend-logos_white.png";
import {useRouteMatch} from "react-router-dom";
import Login from "./login/Login";
import WF_Footer from "../components/WF_Footer";

export default function BaseAuth() {
    const theme = useMantineTheme();
    let path = useRouteMatch();

    return (
        <AppShell
            styles={{
                main: {
                    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2],
                },
            }}
            footer={
                <WF_Footer/>
            }
        >
            { /* Desktop view */}
            <MediaQuery smallerThan="md" styles={{display: "none"}}>
                <Box sx={(theme) => ({
                    padding: theme.spacing.xl,
                    height: "100%",
                })}
                >
                    <Grid align="center" sx={{height: "inherit"}}>
                        <Grid.Col span={6}>
                            <Center>
                                <Image src={theme.colorScheme === 'dark' ? WhiteLogo : BlackLogo} sx={{maxWidth: 650}}
                                       withPlaceholder/>
                            </Center>
                        </Grid.Col>
                        <Grid.Col offset={2} span={3}>
                            <Login/>
                        </Grid.Col>
                    </Grid>
                </Box>
            </MediaQuery>
            { /* Mobile view */}
            <MediaQuery largerThan="md" styles={{display: "none"}}>
                <Stack align="center">
                    <Image src={theme.colorScheme === 'dark' ? WhiteLogo : BlackLogo} sx={{maxWidth: 400}}
                           withPlaceholder/>
                    <Login/>
                </Stack>
            </MediaQuery>
        </AppShell>
    );
}