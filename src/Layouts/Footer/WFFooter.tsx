import {Footer, createStyles, Center, Container, Anchor, SimpleGrid} from "@mantine/core";
import {Link} from "react-router-dom";

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
                <SimpleGrid cols={2} spacing="xl">
                    <div>©2022 Wallet Friend. All rights reserved.</div>
                    <Anchor component={Link} to="/tos">Terms of Service</Anchor>
                </SimpleGrid>
            </Container>
        </Footer>
    );
}

