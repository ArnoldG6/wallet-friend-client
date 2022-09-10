import {Footer, Grid, createStyles, MediaQuery, Burger, Anchor, Group, ActionIcon, Container} from "@mantine/core";
import {MdOutlineWbSunny} from "react-icons/md"

const HEADER_HEIGHT = 110;
const useStyles = createStyles((theme) => ({
    footer: {
        marginTop: 0,
        borderTop: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
        }`,
    },

    inner: {
            height: HEADER_HEIGHT,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',

        [theme.fn.smallerThan('md')]: {
            flexDirection: 'column',
        },
    },

    links: {
        [theme.fn.smallerThan('md')]: {
            marginTop: theme.spacing.lg,
            marginBottom: theme.spacing.sm,
        },
    },
}));

interface WF_FooterProps {
    links: { link: string; label: string }[];
}

export function WF_Footer({ links }: WF_FooterProps) {
    const { classes } = useStyles();
    const items = links.map((link) => (
        <Anchor<'a'>
            color="dimmed"
            key={link.label}
            href={link.link}
            sx={{ lineHeight: 1 }}
            onClick={(event) => event.preventDefault()}
            size="sm"
        >
            {link.label}
        </Anchor>
    ));

    // @ts-ignore
    return (
        <Footer height={HEADER_HEIGHT}>

            <Container className={classes.inner} fluid>
                {/*  <MdOutlineWbSunny size={28} />*/}

                <Group className={classes.links}>©2022 Wallet Friend. All rights reserved. </Group>

                <Group spacing="xs" position="right" noWrap>
                    <ActionIcon size="lg" variant="default" radius="xl">
                        <MdOutlineWbSunny size={18} />
                    </ActionIcon>
                    <ActionIcon size="lg" variant="default" radius="xl">
                        <MdOutlineWbSunny size={18}  />
                    </ActionIcon>
                    <ActionIcon size="lg" variant="default" radius="xl">
                        <MdOutlineWbSunny size={18} />
                    </ActionIcon>
                </Group>
            </Container>


</Footer>
    );
}

