import {Burger, Container, createStyles, Group, Header, Image, useMantineTheme} from "@mantine/core";
import BlackLogo from "../../Assets/Images/Logos/Wallet-Friend-Simple-logos_black.png";
import WhiteLogo from "../../Assets/Images/Logos/Wallet-Friend-Simple-logos_white.png";
import ThemeButton from "../../Components/ThemeButton/ThemeButton";
import {useDisclosure} from "@mantine/hooks";
import {useRouteMatch} from "react-router-dom";

export default function WFHeader() {
    let {path} = useRouteMatch();
    const [opened, {toggle}] = useDisclosure(false);

    const HEADER_HEIGHT = 60;

    const useStyles = createStyles((theme) => ({
        inner: {
            height: HEADER_HEIGHT,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },

        burger: {
            [theme.fn.largerThan('sm')]: {
                display: 'none',
            },
        },
    }));

    const theme = useMantineTheme();
    const {classes} = useStyles();

    return (
        <Header height={HEADER_HEIGHT} sx={{borderBottom: 0}} mb={120}>
            <Container className={classes.inner} fluid>
                <Group>
                    <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" hidden={path === "/auth"}/>
                    <Image src={theme.colorScheme === 'dark' ? WhiteLogo : BlackLogo} width={200} withPlaceholder/>
                </Group>
                <ThemeButton/>
            </Container>
        </Header>
    );
}