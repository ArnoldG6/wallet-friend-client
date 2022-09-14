import {Box, Center, Grid, Image, MediaQuery, Stack, useMantineTheme} from "@mantine/core";
import BlackLogo from "../../Assets/Images/Logos/Wallet-Friend-logos_black.png";
import WhiteLogo from "../../Assets/Images/Logos/Wallet-Friend-logos_white.png";
import {Outlet} from "react-router-dom";

export default function BaseAuth() {
    const theme = useMantineTheme();

    return (
        <>
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
                        <Grid.Col span={4} offset={1}>
                            <Outlet/>
                        </Grid.Col>
                    </Grid>
                </Box>
            </MediaQuery>
            { /* Mobile view */}
            <MediaQuery largerThan="md" styles={{display: "none"}}>
                <Stack align="center">
                    <Image src={theme.colorScheme === 'dark' ? WhiteLogo : BlackLogo} sx={{maxWidth: 400}}
                           withPlaceholder/>
                    <Outlet/>
                </Stack>
            </MediaQuery>
        </>
    );
}