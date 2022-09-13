import {AppShell, Box, Center, Grid, Image, MediaQuery, Stack, useMantineTheme} from "@mantine/core";
import BlackLogo from "../../Assets/Images/Logos/Wallet-Friend-logos_black.png";
import WhiteLogo from "../../Assets/Images/Logos/Wallet-Friend-logos_white.png";
import Login from "./Login/Login";
import WFFooter from "../../Layouts/Footer/WFFooter";
import WFHeader from "../../Layouts/Header/WFHeader";
import SignUp from "./SignUp/SignUp";
import {Redirect, Route, Switch} from "react-router-dom";
import {useState} from "react";

export default function BaseAuth() {
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
                        <Switch>
                            <Route exact path="/auth">
                                <Redirect to="/auth/login"/>
                            </Route>
                            <Route path="/auth/login">
                                <Grid.Col offset={2} span={3}>
                                    <Login/>
                                </Grid.Col>
                            </Route>
                            <Route path="/auth/signup">
                                <Grid.Col offset={1} span={4}>
                                    <SignUp/>
                                </Grid.Col>
                            </Route>
                        </Switch>

                    </Grid>
                </Box>
            </MediaQuery>
            { /* Mobile view */}
            <MediaQuery largerThan="md" styles={{display: "none"}}>
                <Stack align="center">
                    <Image src={theme.colorScheme === 'dark' ? WhiteLogo : BlackLogo} sx={{maxWidth: 400}}
                           withPlaceholder/>
                    <SignUp/>
                </Stack>
            </MediaQuery>
        </AppShell>
    );
}