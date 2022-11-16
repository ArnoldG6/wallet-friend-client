import {
    Button,
    Card,
    Container,
    Divider,
    Grid,
    Group,
    MediaQuery,
    ScrollArea,
    Spoiler,
    Table, Text, Center,
    Title, useMantineTheme, Skeleton, Accordion
} from "@mantine/core";
import {BagsStyles} from "../../../Assets/Styles/Bags.styles";
import {useContext, useState} from "react";
import {AccountContext} from "../../WalletFriend";
import {MdDeleteOutline} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import NewBag from "./NewBag";


export default function Bags() {
    const theme = useMantineTheme();
    const {classes, cx} = BagsStyles();
    const [scrolled, setScrolled] = useState(false);
    const {account} = useContext(AccountContext);
    const navigate = useNavigate();
    const [opened, setOpened] = useState(false);
    return (
        <>
            <MediaQuery smallerThan="md" styles={{display: "none"}}>
                <Container>
                    <Grid gutter={theme.spacing.md}>
                        <Grid.Col>
                            <Title>Categories</Title>
                            <Card mt={20} withBorder p="xl" radius="md" className={classes.card}>
                                <Group position="apart">
                                    <NewBag opened={opened} setOpened={setOpened}/>
                                    <Title color="dimmed" size="sm" align="left">
                                        My categories:
                                    </Title>

                                    <Button onClick={() => setOpened(true)}>Add New Category</Button>
                                </Group>
                                <Divider my="md"/>
                                <ScrollArea onScrollPositionChange={({y}) => setScrolled(y !== 0)}>
                                    <Table highlightOnHover>
                                        <thead className={cx(classes.header, {[classes.scrolled]: scrolled})}>
                                        <tr>
                                            <th>Name</th>
                                            <th>Balance</th>
                                            <th style={{width: "60px"}}></th>
                                            <th style={{width: "60px"}}></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {account?.bags.map((category, index) => (
                                            <tr key={index}>
                                                <td>{category.name}</td>
                                                <td>{category.balance}</td>
                                                <td style={{width: "60px"}}>
                                                    <Button
                                                        onClick={() => navigate(`/home/categories/${category.id}`)}
                                                        variant="gradient"
                                                        gradient={{from: 'teal', to: 'blue', deg: 60}}>
                                                        More Info
                                                    </Button>
                                                </td>
                                                <td style={{width: "60px"}}>
                                                    <Button variant="gradient" gradient={{from: 'orange', to: 'red'}}>
                                                        <MdDeleteOutline size={24}/>
                                                    </Button>
                                                </td>
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
                <Container>
                    <Grid gutter={theme.spacing.md} grow>
                        <Grid.Col>
                            <Title mt={20}>Categories</Title>
                            <Container size="sm" className={classes.wrapper}>
                                <NewBag opened={opened} setOpened={setOpened}/>
                                <Group position="apart">
                                    <Title color="dimmed" size="sm" align="left">
                                        My categories:
                                    </Title>
                                    <Button onClick={() => setOpened(true)}>Add New Category</Button>
                                </Group>
                                <Divider my="md"/>
                                <Accordion variant="contained">
                                    {account?.bags.map((category, index) => (
                                        <Accordion.Item key={index} value={category.name}>
                                            <Accordion.Control>
                                                {category.name}
                                            </Accordion.Control>
                                            <Accordion.Panel>
                                                <Text>Balance: {category.balance}</Text>
                                                <Group mt={"md"} position="apart">
                                                    <Button
                                                        onClick={() => navigate(`/home/categories/${category.id}`)}
                                                        variant="gradient"
                                                        gradient={{from: 'teal', to: 'blue', deg: 60}}>
                                                        More Info
                                                    </Button>
                                                    <Button variant="gradient" gradient={{from: 'orange', to: 'red'}}>
                                                        <MdDeleteOutline size={24}/>
                                                    </Button>
                                                </Group>
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