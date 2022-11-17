import {Link, useNavigate, useParams} from "react-router-dom";
import {
    Accordion,
    Button,
    Card,
    Container,
    Divider,
    Grid,
    Group,
    MediaQuery,
    ScrollArea, Skeleton,
    Spoiler,
    Table, Text, Anchor,
    Title, useMantineTheme
} from "@mantine/core";
import {BagsStyles} from "../../../Assets/Styles/Bags.styles";
import {useContext, useState} from "react";
import {AccountContext} from "../../WalletFriend";
import {TbDiamond} from "react-icons/tb";
import {MdKeyboardArrowLeft} from "react-icons/md";
import AddMovement from "./AddMovement";

export default function Bag() {
    const id = useParams().id;
    const theme = useMantineTheme();
    const {classes, cx} = BagsStyles();
    const [scrolled, setScrolled] = useState(false);
    const {account} = useContext(AccountContext);
    const bag = account?.bags.find(bag => bag.id.toString() === id);
    const navigate = useNavigate();
    const [opened, setOpened] = useState(false);
    function findOrigin(id: number) {
        if (account !== undefined) {
            if (account.single_incomes.find(income => income.id === id) !== undefined) {
                return account.single_incomes.find(income => income.id === id)?.name;
            } else if (account.fixed_incomes.find(income => income.id === id) !== undefined) {
                return account.fixed_incomes.find(income => income.id === id)?.name;
            } else if (account.single_expenses.find(expense => expense.id === id) !== undefined) {
                return account.single_expenses.find(expense => expense.id === id)?.name;
            } else if (account.fixed_expenses.find(expense => expense.id === id) !== undefined) {
                return account.fixed_expenses.find(expense => expense.id === id)?.name;
            } else {
                return "Unknown";
            }
        }
        return "Error obtaining data";
    }

    return (
        <>
            <MediaQuery smallerThan="md" styles={{display: "none"}}>
                <Container fluid>
                    <Grid gutter={theme.spacing.md}>
                        <Grid.Col span={3}>
                            <Button
                                onClick={() => navigate("/home/categories")}
                                leftIcon={<MdKeyboardArrowLeft size={24}/>}
                                variant="gradient"
                                gradient={{from: 'indigo', to: 'cyan'}}>
                                Return
                            </Button>
                            <Card mt={20} withBorder p="xl" radius="md" className={classes.card}>
                                <div className={classes.inner}>
                                    <div>
                                        <Text className={classes.label}>{bag?.name}</Text>
                                        <Text mt={15} size="xl" className={classes.label}>
                                            Net Worth
                                        </Text>
                                        <div>
                                            <Text className={classes.lead} mt={20} color={bag === undefined ? "white" : bag?.balance > 0 ? "green" : "red"}>
                                                ${bag?.balance}
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
                                <AddMovement opened={opened} setOpened={setOpened} id={id}/>
                                <Group position="apart">
                                    <Title color="dimmed" size="sm" align="left">
                                        History:
                                    </Title>

                                    <Button onClick={() => setOpened(true)}>Link New Movement</Button>
                                </Group>

                                <Divider my="md"/>
                                <ScrollArea sx={{height: 400}} onScrollPositionChange={({y}) => setScrolled(y !== 0)}>
                                    <Table>
                                        <thead className={cx(classes.header, {[classes.scrolled]: scrolled})}>
                                        <tr>
                                            <th>Amount</th>
                                            <th>Date</th>
                                            <th>Origin</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {bag?.history.map((history, index) => (
                                            <tr key={index}>
                                                <td>{history.amount > 0 ? "+" + history.amount : "-" + history.amount}</td>
                                                <td>{history.creation_datetime.toLocaleDateString("en-US")}</td>
                                                <td>{findOrigin(history.origin)}</td>
                                            </tr>
                                        ))}
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
                            <Button
                                onClick={() => navigate("/home/categories")}
                                leftIcon={<MdKeyboardArrowLeft size={24}/>}
                                variant="gradient"
                                gradient={{from: 'indigo', to: 'cyan'}}>
                                Return
                            </Button>
                            <Card mt={20} withBorder p="xl" radius="md" className={classes.card}>
                                <div className={classes.inner}>
                                    <div>
                                        <Text className={classes.label}>{bag?.name}</Text>
                                        <Text mt={15} size="xl" className={classes.label}>
                                            Net Worth
                                        </Text>
                                        <div>
                                            <Text className={classes.lead} mt={20} color={bag === undefined ? "white" : bag?.balance > 0 ? "green" : "red"}>
                                                ${bag?.balance}
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
                                    <Title color="dimmed" size="sm" align="left">
                                        History:
                                    </Title>

                                    <Button>Link New Movement</Button>
                                </Group>

                                <Divider my="md"/>
                                <Accordion variant="contained">
                                    {bag?.history.map((history, index) => (
                                        <Accordion.Item key={index} value={history.amount > 0 ? "+" + history.amount : "-" + history.amount}>
                                            <Accordion.Control>{history.amount > 0 ? "+" + history.amount : "-" + history.amount}</Accordion.Control>
                                            <Accordion.Panel>
                                                <Text>{history.creation_datetime.toLocaleDateString("en-US")}</Text>
                                                <Text>{findOrigin(history.origin)}</Text>
                                            </Accordion.Panel>
                                        </Accordion.Item>
                                    ))}
                                </Accordion>
                            </Container>
                        </Grid.Col>
                    </Grid>
                </Container>
            </MediaQuery>
        </>
    );
}