import {createStyles, Text, Card, RingProgress, Group, ThemeIcon} from '@mantine/core';
import {TbDiamond} from "react-icons/tb";
const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },

    label: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 400,
        lineHeight: 1,
    },

    lead: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 700,
        fontSize: 22,
        lineHeight: 1,
    },

    inner: {
        display: 'flex',

        [theme.fn.smallerThan(350)]: {
            flexDirection: 'column',
        },
    },

    ring: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',

        [theme.fn.smallerThan(350)]: {
            justifyContent: 'center',
            marginTop: theme.spacing.md,
        },
    },
}));


export function NetWorthCard() {
    const { classes, theme } = useStyles();


    return (
        <Card withBorder p="xl" radius="md" className={classes.card}>
            <div className={classes.inner}>
                <div>
                    <Text size="xl" className={classes.label}>
                        Net Worth
                    </Text>
                    <div>
                        <Text className={classes.lead} mt={30}>
                            $2000
                        </Text>
                    </div>
                </div>

                <div className={classes.ring}>

                        <TbDiamond size={45} color="teal" />


                </div>
            </div>
        </Card>
    );
}