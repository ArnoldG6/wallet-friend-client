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
import {AccountContext} from "../../WalletFriend";
import {TbDiamond} from "react-icons/tb";
import AddExpenses from "../../../Pages/Home/Expenses/AddExpenses";

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

export function Expenses() {
    const theme = useMantineTheme();
    const {classes, cx} = useStyles();
    const [scrolled, setScrolled] = useState(false);
    const {account} = useContext(AccountContext);
    const [opened, setOpened] = useState(false);
    let sum = 0;
    const fixedEarning = account?.fixed_expenses.forEach(item => sum += item.amount)
    const fixedExpenses = account?.fixed_expenses.map((data) => (
        <tr key={data?.name}>
            <td>{data?.creation_datetime.toLocaleDateString("en-US")}</td>
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
                    <MdOutlineDelete size={24}/>
                </Button>
            </td>
        </tr>
    ));
    const fixedExpenseslist = account?.fixed_expenses.map((data) => (
        <Accordion.Item value={data?.name}>
            <Accordion.Control>{data?.name}</Accordion.Control>
            <Accordion.Panel>
                Date: {data?.creation_datetime.toLocaleDateString("en-US")}<Space h="md"/>
                Amount:
                <Text color={"red"}>
                    {data?.amount}
                </Text><Space h="md"/>
                Description: {data?.description}
                <Divider my="md"/>
                <Group spacing={0} position="right">
                    <ActionIcon color="red" size="xl" variant="filled">
                        <MdOutlineDelete size={24}/>
                    </ActionIcon>
                </Group>
            </Accordion.Panel>
        </Accordion.Item>
    ));
    const singleExpenses = account?.single_expenses.map((data) => (
        <tr key={data?.name}>
            <td>{data?.creation_datetime.toLocaleDateString("en-US")}</td>
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
                    <MdOutlineDelete size={24}/>
                </Button>
            </td>
        </tr>
    ));
    const singleExpenseslist = account?.single_expenses.map((data) => (
        <Accordion.Item value={data?.name}>
            <Accordion.Control>{data?.name}</Accordion.Control>
            <Accordion.Panel>
                Date: {data?.creation_datetime.toLocaleDateString("en-US")}<Space h="md"/>
                Amount:
                <Text color={"red"}>
                    {data?.amount}
                </Text><Space h="md"/>
                Description: {data?.description}
                <Divider my="md"/>
                <Group spacing={0} position="right">
                    <ActionIcon color="red" size="xl" variant="filled">
                        <MdOutlineDelete size={24}/>
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
                            <Card mt={20} withBorder p="xl" radius="md" className={classes.card}>
                                <div className={classes.inner}>
                                    <div>
                                        <Text mt={15} size="xl" className={classes.label}>
                                            Net Loss
                                        </Text>
                                        <div>
                                            <Text className={classes.lead} mt={20}
                                                  color={sum === undefined ? "white" : sum > 0 ? "green" : "red"}>
                                                ${sum}
                                            </Text>
                                        </div>
                                    </div>
                                    <div className={classes.ring}>
                                        <TbDiamond size={45} color="teal"/>
                                    </div>
                                </div>
                            </Card>
                        </Grid.Col>
                        <Grid.Col span={6}>
                        </Grid.Col>
                        <Grid.Col>
                            <Card withBorder p="xl" radius="md" className={classes.card}>
                                <Group position="apart">
                                    <AddExpenses opened={opened} setOpened={setOpened}/>
                                    <Title color="dimmed" size="sm" align="left">
                                        My earnings:
                                    </Title>
                                    <Button onClick={() => setOpened(true)}>Add New Expense</Button>
                                </Group>
                                <Divider my="md"/>
                                <ScrollArea sx={{height: 300}} onScrollPositionChange={({y}) => setScrolled(y !== 0)}>
                                    <Table sx={{minWidth: 700}} highlightOnHover>
                                        <thead className={cx(classes.header, {[classes.scrolled]: scrolled})}>
                                        <tr>
                                            <th style={{width: "150px"}}>Date</th>
                                            <th>Name</th>
                                            <th>Amount</th>
                                            <th>Description</th>
                                            <th/>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {fixedExpenses}
                                        {singleExpenses}
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
                            <Card mt={20} withBorder p="xl" radius="md" className={classes.card}>
                                <div className={classes.inner}>
                                    <div>
                                        <Text mt={15} size="xl" className={classes.label}>
                                            Net Loss
                                        </Text>
                                        <div>
                                            <Text className={classes.lead} mt={20}
                                                  color={sum === undefined ? "white" : sum > 0 ? "green" : "red"}>
                                                ${sum}
                                            </Text>
                                        </div>
                                    </div>
                                    <div className={classes.ring}>
                                        <TbDiamond size={45} color="teal"/>
                                    </div>
                                </div>
                            </Card>
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
                                    {fixedExpenseslist}
                                    {singleExpenseslist}
                                </Accordion>
                            </Container>
                        </Grid.Col>
                    </Grid>

                </Container>
            </MediaQuery>
        </>
    );
}