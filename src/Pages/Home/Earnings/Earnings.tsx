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
    useMantineTheme, Space, ActionIcon, Tabs
} from '@mantine/core';
import {MdOutlineDelete} from "react-icons/md";
import {useContext, useState} from "react";
import {AccountContext} from "../../WalletFriend";
import {TbDiamond} from "react-icons/tb";
import {AreaChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Area, ResponsiveContainer} from 'recharts';
import graphData from "../../../Services/Utils/GraphData/graphData.util";
import AddEarnings from "../Earnings/AddEarnings";
import AddFixedMovement from "../Earnings/AddFixedMovement";
import deleteActions from "../../../Services/Actions/Single_Movement/delete.action";
import {openConfirmModal} from "@mantine/modals";

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

export function Earnings() {
    function handleDelete(values: any) {
        deleteActions(values)
            .then(success => {
                if (success){
                    window.location.reload();
                }
            })
            .catch(() => {
            })
    }
    const openDeleteModal = (index:any) =>
        openConfirmModal({
            title: 'Delete your movement',
            centered: true,
            children: (
                <Text size="sm">
                    Are you sure you want to delete this movement? This action is destructive.
                </Text>
            ),
            labels: { confirm: 'Delete', cancel: "Cancel" },
            confirmProps: { color: 'red' },
            onCancel: () => console.log('Cancel'),
            onConfirm: () => handleDelete(index),
        });
    const theme = useMantineTheme();
    const {classes, cx} = useStyles();
    const [scrolled, setScrolled] = useState(false);
    const {account} = useContext(AccountContext);
    const [opened, setOpened] = useState(false);
    const [openedF, setOpenedF] = useState(false);
    let data = graphData(account?.single_incomes.slice(), account?.fixed_incomes.slice());
    let sum = 0;
    const fixedEarning = account?.fixed_incomes.forEach(item => sum += item.amount)
    const rows = account?.fixed_incomes.map((data) => (
        <tr key={data?.id}>
            <td>{data?.creation_datetime.toLocaleDateString("en-US")}</td>
            <td>{data?.name}</td>
            <td><Text color={"green"}>{data?.amount}</Text></td>
            <td>
                <Spoiler maxHeight={30} showLabel="Show more" hideLabel="Hide">
                    <div>
                        <Text>
                            {data?.description}
                        </Text>
                    </div>
                </Spoiler>
            </td>
            <td style={{width: "90px"}}>
                <Button color="red" onClick={() => openDeleteModal(data?.id)}>
                    <MdOutlineDelete size={24}/>
                </Button>
            </td>
        </tr>
    ));
    const list = account?.fixed_incomes.map((data) => (
        <Accordion.Item value={data?.name}>
            <Accordion.Control>{data?.name}</Accordion.Control>
            <Accordion.Panel>
                Date: {data?.creation_datetime.toLocaleDateString("en-US")}<Space h="md"/>
                Amount: <Text color={"green"}>{data?.amount}</Text><Space h="md"/>
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
    const singleEarnings = account?.single_incomes.map((data) => (
        <tr key={data?.id}>
            <td>{data?.creation_datetime.toLocaleDateString("en-US")}</td>
            <td>{data?.name}</td>
            <td><Text color={"green"}>
                {data?.amount}
            </Text></td>
            <td style={{width: "200px"}}>
                <Spoiler maxHeight={30} showLabel="Show more" hideLabel="Hide">
                    <div>
                        <Text>
                            {data?.description}
                        </Text>
                    </div>
                </Spoiler>
            </td>
            <td style={{width: "90px"}}>
                <Button color="red" onClick={() => openDeleteModal(data?.id)}>
                    <MdOutlineDelete size={24}/>
                </Button>
            </td>
        </tr>
    ));


    const singleEarningslist = account?.single_incomes.map((data) => (
        <Accordion.Item value={data?.name}>
            <Accordion.Control>{data?.name}</Accordion.Control>
            <Accordion.Panel>
                Date: {data?.creation_datetime.toLocaleDateString("en-US")}<Space h="md"/>
                Amount:<Text color={"green"}>{data?.amount}</Text><Space h="md"/>
                Description: {data?.description}
                <Divider my="md"/>
                <Group spacing={0} position="right">
                    <ActionIcon color="red" size="xl" onClick={() => openDeleteModal(data?.id)}variant="filled">
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
                                            Net Gain
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
                        <Grid.Col span={9}>
                            <ResponsiveContainer>
                                <AreaChart data={data} margin={{top: 5, right: 20, bottom: 5, left: 0}}>
                                    <defs>
                                        <linearGradient id="data" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b417" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="#10b417" stopOpacity={0}/>
                                        </linearGradient>
                                        <linearGradient id="predicted" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#13678a" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="#13678a" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                                    <Tooltip/>
                                    <Area type="monotone" dataKey="value" stroke="#10b417" fillOpacity={1} fill="url(#data)" />
                                    <Area type="monotone" dataKey="predicted" stroke="#13678a" fillOpacity={1} fill="url(#predicted)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </Grid.Col>
                        <Grid.Col>
                            <Tabs defaultValue="single_movements" >
                                <Tabs.List>
                                    <Tabs.Tab value="single_movements" >Movements</Tabs.Tab>
                                    <Tabs.Tab value="fixed_movements" >Fixed movements</Tabs.Tab>
                                </Tabs.List>

                                <Tabs.Panel value="fixed_movements" pt="xs">
                                    <Card withBorder p="xl" radius="md" className={classes.card}>
                                        <Group position="apart">
                                            <AddFixedMovement opened={openedF} setOpened={setOpenedF}/>
                                            <Title color="dimmed" size="sm" align="left">
                                                My earnings:
                                            </Title>
                                            <Button onClick={() => setOpenedF(true)}>Add New Fixed Earrning</Button>
                                        </Group>
                                        <Divider my="md"/>
                                        <ScrollArea sx={{height: 450}} onScrollPositionChange={({y}) => setScrolled(y !== 0)}>
                                            <Table sx={{minWidth: 500}} highlightOnHover>
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
                                                {rows}
                                                </tbody>
                                            </Table>
                                        </ScrollArea>
                                    </Card>
                                </Tabs.Panel>

                                <Tabs.Panel value="single_movements" pt="xs">
                                    <Card withBorder p="xl" radius="md" className={classes.card}>
                                        <Group position="apart">
                                            <AddEarnings opened={opened} setOpened={setOpened}/>
                                            <Title color="dimmed" size="sm" align="left">
                                                My earnings:
                                            </Title>
                                            <Button onClick={() => setOpened(true)}>Add New Earning</Button>
                                        </Group>
                                        <Divider my="md"/>
                                        <ScrollArea sx={{height: 450}} onScrollPositionChange={({y}) => setScrolled(y !== 0)}>
                                            <Table sx={{minWidth: 500}} highlightOnHover>
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
                                                {/*rows*/}
                                                {singleEarnings}
                                                </tbody>
                                            </Table>
                                        </ScrollArea>
                                    </Card>
                                </Tabs.Panel>


                            </Tabs>

                            <Space h="md"/>
                            <Divider/>
                            <Space h="md"/>

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
                                            Net Gain
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
                            <Container size="sm" className={classes.wrapper}>
                                <Group position="apart">
                                    <AddEarnings opened={opened} setOpened={setOpened}/>
                                    <Title color="dimmed" size="sm" align="left">
                                        My earnings:
                                    </Title>
                                    <Button onClick={() => setOpened(true)}>Add New Earning</Button>
                                </Group>
                                <Divider my="md"/>
                                <Accordion variant="contained">
                                    {/*list*/}
                                    {singleEarningslist}
                                </Accordion>
                            </Container>
                        </Grid.Col>
                    </Grid>
                </Container>
            </MediaQuery>
        </>
    );
}