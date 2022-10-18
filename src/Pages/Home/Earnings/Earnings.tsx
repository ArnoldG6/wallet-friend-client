import {
    Accordion,
    Badge,
    Button,
    Card,
    Container,
    createStyles, Divider,
    Grid, Group, MediaQuery,
    ScrollArea,
    Skeleton, Spoiler, Table,
    Title,
    useMantineTheme
} from '@mantine/core';

import {useState} from "react";
import {NetWorthCard} from "../../../Components/EarringsCard/NetWorthCard";

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },

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
                <Container fluid>
                    <Grid gutter={theme.spacing.md}>
                        <Grid.Col span={3}>
                            <NetWorthCard/>
                        </Grid.Col>
                        <Grid.Col span={6}>

                        </Grid.Col>
                        <Grid.Col>
                            <Card withBorder p="xl" radius="md" className={classes.card}>
                                <Group position="apart">
                                    <Title color="dimmed" size="sm" align="left">
                                        My earnings:
                                    </Title>

                                    <Button>Add New Earning</Button>
                                </Group>

                                <Divider my="md"/>
                                <ScrollArea sx={{height: 300}} onScrollPositionChange={({y}) => setScrolled(y !== 0)}>
                                    <Table>
                                        <thead className={cx(classes.header, {[classes.scrolled]: scrolled})}>
                                        <tr>
                                            <th>Date</th>
                                            <th>Name</th>
                                            <th>Amount</th>
                                            <th>Description</th>
                                        </tr>
                                        </thead>
                                        <tbody>

                                        <tr key={"Salary"}>
                                            <td>{"2022-10-22"}</td>
                                            <td>{"Salary"}</td>
                                            <td>{"200"}</td>
                                            <td>
                                                <Spoiler maxHeight={120} showLabel="Show more" hideLabel="Hide">
                                                    <td>{"ngrrrrrrr"}</td>
                                                </Spoiler>

                                            </td>
                                        </tr>

                                        </tbody>
                                    </Table>
                                </ScrollArea>
                            </Card>


                        </Grid.Col>

                    </Grid>

                </Container>
            </MediaQuery>
            <MediaQuery largerThan="md" styles={{display: "none"}}>
                <Container my="md">
                    <Grid gutter={theme.spacing.md} grow>
                        <Grid.Col>
                            <NetWorthCard/>
                        </Grid.Col>
                        <Grid.Col>
                            <Skeleton height={140} radius="md" animate={false}/>
                        </Grid.Col>
                        <Grid.Col>
                            <Container size="sm" className={classes.wrapper}>
                                <Group position="apart">
                                    <Title color="dimmed" size="sm" align="left">
                                        My earnings:
                                    </Title>

                                    <Button>Add New Earning</Button>
                                </Group>

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