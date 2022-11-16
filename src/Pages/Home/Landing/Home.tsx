import {AccountContext, UserContext} from "../../WalletFriend";
import {useContext} from "react";
import {Card, Container, Grid, MediaQuery, Text, useMantineTheme, Anchor} from "@mantine/core";
import {TbDiamond} from "react-icons/tb";
import {BasicStyles} from "../../../Assets/Styles/Basic.styles";
import graphData from "../../../Services/Utils/GraphData/graphData.util";
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {Link} from "react-router-dom";

export default function Home() {
    const {user} = useContext(UserContext);
    const {account} = useContext(AccountContext);
    const theme = useMantineTheme();
    const {classes, cx} = BasicStyles();
    let dataExpense = graphData(account?.single_expenses.slice(), account?.fixed_expenses.slice());
    let dataIncomeSum = 0;
    let dataExpenseSum = 0;
    account?.fixed_expenses.forEach(item => dataExpenseSum += item.amount)
    account?.fixed_incomes.forEach(item => dataIncomeSum += item.amount)
    let dataIncome = graphData(account?.single_incomes.slice(), account?.fixed_incomes.slice());
    console.log(dataIncome)

    return (
        <>
            <MediaQuery smallerThan="md" styles={{display: "none"}}>
                <Container my="md" fluid>
                    <Grid gutter={theme.spacing.md} grow>
                        <Grid.Col span={5}>
                            <Card withBorder p="xl" radius="md" className={classes.card}>
                                <div className={classes.inner}>
                                    <div>
                                        <Text mt={5} size="xl" className={classes.label}>
                                            Welcome!
                                        </Text>
                                        <div>
                                            <Text className={classes.lead} mt={15}>
                                                Your current balance is ${account?.total_balance}
                                            </Text>
                                        </div>
                                    </div>
                                    <div className={classes.ring}>
                                        <TbDiamond size={45} color="teal"/>
                                    </div>
                                </div>
                            </Card>
                        </Grid.Col>
                        <Grid.Col span={7}>
                        </Grid.Col>
                        <Grid.Col span={9}>
                            <Text className={classes.lead} mb={15}>
                                Earnings Chart
                            </Text>
                            <ResponsiveContainer height={250}>
                                <AreaChart data={dataIncome} margin={{top: 5, right: 20, bottom: 5, left: 0}}>
                                    <defs>
                                        <linearGradient id="dataIncome" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b417" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="#10b417" stopOpacity={0}/>
                                        </linearGradient>
                                        <linearGradient id="predictedIncome" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#13678a" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="#13678a" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                                    <Tooltip/>
                                    <Area type="monotone" dataKey="value" stroke="#10b417" fillOpacity={1} fill="url(#dataIncome)" />
                                    <Area type="monotone" dataKey="predicted" stroke="#13678a" fillOpacity={1} fill="url(#predictedIncome)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </Grid.Col>
                        <Grid.Col span={3}>
                            <Card mt={40} withBorder p="xl" radius="md" className={classes.card}>
                                <div className={classes.inner}>
                                    <div>
                                        <Text mt={15} size="xl" className={classes.label}>
                                            Net Gain
                                        </Text>
                                        <div>
                                            <Text className={classes.lead} mt={20}
                                                  color={dataIncomeSum === undefined ? "white" : dataIncomeSum > 0 ? "green" : "red"}>
                                                ${dataIncomeSum}
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
                            <Text className={classes.lead} mb={15}>
                                Expenses Chart
                            </Text>
                            <ResponsiveContainer height={250}>
                                <AreaChart data={dataExpense} margin={{top: 5, right: 20, bottom: 5, left: 0}}>
                                    <defs>
                                        <linearGradient id="data" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#e82121" stopOpacity={0}/>
                                            <stop offset="95%" stopColor="#e82121" stopOpacity={0.8}/>
                                        </linearGradient>
                                        <linearGradient id="predicted" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#f4722b" stopOpacity={0}/>
                                            <stop offset="95%" stopColor="#f4722b" stopOpacity={0.8}/>
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                                    <Tooltip/>
                                    <Area type="monotone" dataKey="value" stroke="#e82121" fillOpacity={1}
                                          fill="url(#data)"/>
                                    <Area type="monotone" dataKey="predicted" stroke="#f4722b" fillOpacity={1}
                                          fill="url(#predicted)"/>
                                </AreaChart>
                            </ResponsiveContainer>
                        </Grid.Col>
                        <Grid.Col span={3}>
                            <Card mt={40} withBorder p="xl" radius="md" className={classes.card}>
                                <div className={classes.inner}>
                                    <div>
                                        <Text mt={15} size="xl" className={classes.label}>
                                            Net Loss
                                        </Text>
                                        <div>
                                            <Text className={classes.lead} mt={20}
                                                  color={dataExpenseSum === undefined ? "white" : dataExpenseSum > 0 ? "green" : "red"}>
                                                ${dataExpenseSum}
                                            </Text>
                                        </div>
                                    </div>
                                    <div className={classes.ring}>
                                        <TbDiamond size={45} color="teal"/>
                                    </div>
                                </div>
                            </Card>
                        </Grid.Col>
                    </Grid>
                </Container>
            </MediaQuery>
            <MediaQuery largerThan="md" styles={{display: "none"}}>
                <Container my="md" fluid>
                    <Grid gutter={theme.spacing.md} grow>
                        <Grid.Col>
                            <Card mt={15} withBorder p="xl" radius="md" className={classes.card}>
                                <div className={classes.inner}>
                                    <div>
                                        <Text mt={5} size="xl" className={classes.label}>
                                            Welcome!
                                        </Text>
                                        <div>
                                            <Text className={classes.lead} mt={15}>
                                                Your current balance is ${account?.total_balance}
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
                            <Card mt={40} withBorder p="xl" radius="md" className={classes.card}>
                                <div className={classes.inner}>
                                    <div>
                                        <Text mt={15} size="xl" className={classes.label}>
                                            Net Gain
                                        </Text>
                                        <div>
                                            <Text className={classes.lead} mt={20} mb={20}
                                                  color={dataIncomeSum === undefined ? "white" : dataIncomeSum > 0 ? "green" : "red"}>
                                                ${dataIncomeSum}
                                            </Text>
                                        </div>
                                        <div>
                                            <Anchor component={Link} to={'/home/earnings'}>
                                                Manage your Earnings &gt;
                                            </Anchor>
                                        </div>
                                    </div>
                                    <div className={classes.ring}>
                                        <TbDiamond size={45} color="teal"/>
                                    </div>
                                </div>
                            </Card>
                        </Grid.Col>
                        <Grid.Col>
                            <Card mt={40} withBorder p="xl" radius="md" className={classes.card}>
                                <div className={classes.inner}>
                                    <div>
                                        <Text mt={15} size="xl" className={classes.label}>
                                            Net Loss
                                        </Text>
                                        <div>
                                            <Text className={classes.lead} mt={20} mb={20}
                                                  color={dataExpenseSum === undefined ? "white" : dataExpenseSum > 0 ? "green" : "red"}>
                                                ${dataExpenseSum}
                                            </Text>
                                        </div>
                                        <div>
                                            <Anchor component={Link} to={'/home/earnings'}>
                                                Manage your Expenses &gt;
                                            </Anchor>
                                        </div>
                                    </div>
                                    <div className={classes.ring}>
                                        <TbDiamond size={45} color="teal"/>
                                    </div>
                                </div>
                            </Card>
                        </Grid.Col>
                    </Grid>
                </Container>
            </MediaQuery>
        </>
    );
}