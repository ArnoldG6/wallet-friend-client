import {Burger, Container, createStyles, Group, Header, Image, MediaQuery, useMantineTheme} from "@mantine/core";
import BlackLogo from "../../Assets/Images/Logos/Wallet-Friend-Simple-logos_black.png";
import WhiteLogo from "../../Assets/Images/Logos/Wallet-Friend-Simple-logos_white.png";
import ThemeButton from "../../Components/ThemeButton/ThemeButton";
import LogoutButton from "../../Components/LogoutButton/LogoutButton";
import {useMatch} from "react-router-dom";

export default function WFHeader({opened, setOpened}: { opened: boolean, setOpened: (opened: (o: any) => boolean) => void }) {
    let match = useMatch("/auth/*");

    const HEADER_HEIGHT = 60;

    const useStyles = createStyles((theme) => ({
        inner: {
            height: HEADER_HEIGHT,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    }));

    const theme = useMantineTheme();
    const {classes} = useStyles();

    return (
        <Header height={HEADER_HEIGHT} sx={{borderBottom: 0}} mb={120}>
            <Container className={classes.inner} fluid>
                <Group>
                    <MediaQuery largerThan="sm" styles={{display: 'none'}}>
                        <Burger opened={opened} onClick={() => { setOpened((o) => !o) }} size="sm" hidden={match !== null}/>
                    </MediaQuery>
                    <Image src={theme.colorScheme === 'dark' ? WhiteLogo : BlackLogo} width={200} withPlaceholder/>
                </Group>
                <Group>
                    <ThemeButton/>
                    <LogoutButton/>
                </Group>
            </Container>
        </Header>
    );
}