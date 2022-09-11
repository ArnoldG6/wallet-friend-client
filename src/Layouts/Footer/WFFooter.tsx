import {Footer, createStyles, Center, Container} from "@mantine/core";

export default function WFFooter() {
    const HEADER_HEIGHT = 70;
    const useStyles = createStyles((theme) => ({
        inner: {
            height: HEADER_HEIGHT,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',

            [theme.fn.smallerThan('md')]: {
                flexDirection: 'column',
            },
        }
    }));
    const {classes} = useStyles();
    return (
        <Footer height={HEADER_HEIGHT}>
            <Container className={classes.inner} fluid>
                <Center>©2022 Wallet Friend. All rights reserved. </Center>
            </Container>
        </Footer>
    );
}

