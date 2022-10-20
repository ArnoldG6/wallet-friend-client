import {
    Accordion,
    Text,
    Button,
    Card,
    Container,
    createStyles, Divider,
    Grid, Group, MediaQuery,
    ScrollArea,
    Spoiler, Table,
    Title,
    useMantineTheme, Space, ActionIcon
} from '@mantine/core';
import {MdOutlineDelete} from "react-icons/md";
import {useContext, useState} from "react";
import {NetWorthCard} from "../../../Components/NetWorthCard/NetWorthCard";
import {AccountContext} from "../../WalletFriend";

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

export function Expenses() {
    const theme = useMantineTheme();
    const {classes, cx} = useStyles();
    const [scrolled, setScrolled] = useState(false);
    const {account} = useContext(AccountContext);
    const rows = account?.fixed_expenses.map((data) => (
        <tr key={data?.name}>
            <td>{data?.creation_datetime.toString()}</td>
            <td>{data?.name}</td>
            <td>
                <Text color={"red"}>
                    {data?.amount}
                </Text>
            </td>
            <td>
                <Spoiler maxHeight={30} showLabel="Show more" hideLabel="Hide">
                    <div>
                        <Text>
                            {data?.description}
                        </Text>
                    </div>
                </Spoiler>
            </td>
            <td>
                <Button color="red">
                    <MdOutlineDelete/>
                </Button>
            </td>
        </tr>
    ));
    const list = account?.fixed_expenses.map((data) => (
        <Accordion.Item value={data?.name}>
            <Accordion.Control>{data?.name}</Accordion.Control>
            <Accordion.Panel>
                Date: {data?.creation_datetime.toString()}<Space h="md"/>
                Amount:
                <Text color={"red"}>
                    {data?.amount}
                </Text><Space h="md"/>
                Description: {data?.description}
                <Divider my="md"/>
                <Group spacing={0} position="right">
                    <ActionIcon color="red" size="xl" variant="filled">
                        <MdOutlineDelete/>
                    </ActionIcon>
                </Group>
            </Accordion.Panel>
        </Accordion.Item>
    ));

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
                                    <Button>Add New Expense</Button>
                                </Group>
                                <Divider my="md"/>
                                <ScrollArea sx={{height: 300}} onScrollPositionChange={({y}) => setScrolled(y !== 0)}>
                                    <Table sx={{minWidth: 700}} highlightOnHover>
                                        <thead className={cx(classes.header, {[classes.scrolled]: scrolled})}>
                                        <tr>
                                            <th>Date</th>
                                            <th>Name</th>
                                            <th>Amount</th>
                                            <th style={{width: "200px"}}>Description</th>
                                            <th/>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {rows}

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
                                    {list}
                                </Accordion>
                            </Container>
                        </Grid.Col>
                    </Grid>

                </Container>
            </MediaQuery>
        </>
    );
}