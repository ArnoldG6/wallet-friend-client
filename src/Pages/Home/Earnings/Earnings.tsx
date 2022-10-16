import {
    Accordion,
    Container,
    createStyles, Divider,
    Grid, MediaQuery,
    ScrollArea,
    Skeleton, Table,
    Title,
    useMantineTheme
} from '@mantine/core';

import {useState} from "react";

const useStyles = createStyles((theme) => ({
    header: {
        position: 'sticky',
        top: 0,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        transition: 'box-shadow 150ms ease',

        '&::after': {
            content: '""',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            borderBottom: `1px solid ${
                theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]
            }`,
        },
    },

    scrolled: {
        boxShadow: theme.shadows.sm,
    },
    wrapper: {
        paddingTop: theme.spacing.xl * 2,
        paddingBottom: theme.spacing.xl * 2,
        minHeight: 650,
    },

    title: {
        marginBottom: theme.spacing.xl * 1.5,
    },


}));

export function Earnings() {
    const theme = useMantineTheme();
    const {classes, cx} = useStyles();
    const [scrolled, setScrolled] = useState(false);

    const placeholder =
        'It can’t help '
    return (

        <>
            <MediaQuery smallerThan="md" styles={{display: "none"}}>
                <Container fluid >
                    <Grid gutter={theme.spacing.md} grow>
                        <Grid.Col span={6}>
                            <Container fluid>
                                <Title size="h1" align="left">
                                    Net Worth:
                                </Title>
                            </Container>

                        </Grid.Col>
                        <Grid.Col span={6}>
                            Grafico
                        </Grid.Col>
                        <Grid.Col>

                            <Container fluid>
                                <Title color="dimmed" size="sm" align="left">
                                    My earnings:
                                </Title>
                            </Container>
                            <Divider my="md"/>
                            <ScrollArea sx={{height: 300}} onScrollPositionChange={({y}) => setScrolled(y !== 0)}>
                                <Table sx={{minWidth: 700}}>
                                    <thead className={cx(classes.header, {[classes.scrolled]: scrolled})}>
                                    <tr>
                                        <th>Categories</th>
                                        <th>Name</th>
                                        <th>Amount</th>
                                    </tr>
                                    </thead>
                                    <tbody></tbody>
                                </Table>
                            </ScrollArea>


                        </Grid.Col>

                    </Grid>

                </Container>
            </MediaQuery>
            <MediaQuery largerThan="md" styles={{display: "none"}}>
                <Container my="md">
                    <Grid gutter={theme.spacing.md} grow>
                        <Grid.Col span={6}>
                            <Container size={460} my={30}>
                                <Title size="h1" align="left">
                                    Net Worth:
                                </Title>
                            </Container>

                        </Grid.Col>
                        <Grid.Col span={6}>
                            Grafico
                        </Grid.Col>
                        <Grid.Col>
                            <Container size="sm" className={classes.wrapper}>
                                <Title color="dimmed" size="sm" align="left">
                                    My earnings:
                                </Title>
                                <Divider my="md"/>
                                <Accordion variant="contained">
                                    <Accordion.Item value="school">
                                        <Accordion.Control>School</Accordion.Control>
                                        <Accordion.Panel>{placeholder}</Accordion.Panel>
                                    </Accordion.Item>

                                    <Accordion.Item value="sc1hool">
                                        <Accordion.Control>school</Accordion.Control>
                                        <Accordion.Panel>{placeholder}</Accordion.Panel>
                                    </Accordion.Item>


                                </Accordion>
                            </Container>


                        </Grid.Col>

                    </Grid>

                </Container>
            </MediaQuery>
        </>
    );
}