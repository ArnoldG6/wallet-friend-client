import {
    ActionIcon,
    Burger,
    Container,
    createStyles,
    Grid, Group,
    Header,
    Image,
    MediaQuery,
    useMantineTheme
} from "@mantine/core";
import {MdOutlineNightsStay} from "react-icons/md"
import {MdOutlineWbSunny} from "react-icons/md"
import BlackLogo from "../../assets/images/logos/Wallet-Friend-Simple-logos_black.png";
import WhiteLogo from "../../assets/images/logos/Wallet-Friend-Simple-logos_white.png";
import LightAndDarkModeButton from "./LightDarkButton";
import {useState} from "react";
import {useDisclosure} from "@mantine/hooks";
const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
    inner: {
        height: HEADER_HEIGHT,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },



    burger: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },
}));


export default function WF_Header() {
    const [opened, { toggle }] = useDisclosure(false);

    const theme = useMantineTheme();
    const {classes} = useStyles();
    function logoTheme() {
        if (theme.colorScheme === 'dark') {
            return <Image src={WhiteLogo}  fit="contain"         width={200}
                          height={80}/>;
        } else {
            return <Image src={BlackLogo}  fit="contain"         width={200}
                          height={80}/>;
        }
    }


    return (
        <Header height={HEADER_HEIGHT} sx={{ borderBottom: 0 }} mb={120}>
            <Container className={classes.inner} fluid>
                <Group>
                    <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
                    {logoTheme()}
                </Group>
                
                <LightAndDarkModeButton/>
            </Container>
        </Header>


    );
}