import {useContext, useState} from 'react';
import {Modal, Button, Group, SimpleGrid, TextInput, Space, Box, createStyles, NumberInput} from '@mantine/core';
import {MdDriveFileRenameOutline, MdOutlineAttachMoney, MdDateRange} from "react-icons/md";
import {useForm} from "@mantine/form";
import bagsActions from "../../../Services/Actions/Bag/bags.action";
import {AccountContext} from "../../WalletFriend";
import {useNavigate} from "react-router-dom";
import {DatePicker} from "@mantine/dates";
import dayjs from "dayjs";

export default function NewBag({opened, setOpened}: { opened: boolean, setOpened: (opened: (o: any) => boolean) => void }) {
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();
    const {account} = useContext<any>(AccountContext);
    const useStyles = createStyles((theme) => ({
        title: {
            fontSize: 26,
            fontWeight: 900,
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        },
        controls: {
            [theme.fn.smallerThan('xs')]: {
                flexDirection: 'column-reverse',
            },
        },
        control: {
            [theme.fn.smallerThan('xs')]: {
                width: '100%',
                textAlign: 'center',
            },
        },
    }));
    const form = useForm({
        initialValues: {
            name: '',
            goal_balance:undefined,
            end_date: undefined,

        },
        validate: {
            name: (value) => (value.length > 0 ? null : 'A name is required'),
            goal_balance: (value) => (value === undefined ? 'A goal is required' :null ),
            end_date: (value) => (value === undefined ?  'A date is required': null),

        }
    });
    function handleSubmit(values: any, account:any) {
        setVisible(true);
        bagsActions(values ,account)
            .then(success => {
                if (success){
                    setOpened((o) => !o);
                    window.location.reload();
                }
            })
            .catch(() => {
                setVisible(false);
            })
    }
    return (
        <>
            <Modal
                opened={opened}
                onClose={() => setOpened((o) => !o)}
                title="Add new Bag!"
            >
                <Box
                    sx={(theme) => ({
                        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                        textAlign: 'center',
                        padding: theme.spacing.xl,
                        borderRadius: theme.radius.md,
                        position: 'relative',
                    })}
                >
                    <form onSubmit={form.onSubmit((values) => handleSubmit(values, account?.id))}>
                        <SimpleGrid cols={1} breakpoints={[{maxWidth: 'sm', cols: 1}]}>
                            <TextInput
                                withAsterisk
                                label="Name"
                                placeholder="name"
                                radius="md"
                                size="md"
                                icon={<MdDriveFileRenameOutline/>}
                                {...form.getInputProps('name')}
                            />

                        </SimpleGrid>
                        <Space h="md"/>

                        <SimpleGrid cols={1} breakpoints={[{maxWidth: 'sm', cols: 1}]}>
                            <NumberInput
                                withAsterisk
                                label="Goal"
                                placeholder="enter an amount"
                                radius="md"
                                size="md"
                                icon={<MdOutlineAttachMoney/>}
                                {...form.getInputProps('goal_balance')}
                            />

                        </SimpleGrid>
                        <Space h="md"/>
                        <SimpleGrid cols={1} breakpoints={[{maxWidth: 'sm', cols: 1}]}>
                            <DatePicker
                                withAsterisk
                                placeholder="Pick date"
                                label="End Date"
                                radius="md"
                                size="md"
                                minDate={new Date()}
                                icon={<MdDateRange/>}
                                {...form.getInputProps('end_date')}
                            />
                        </SimpleGrid>
                        <Space h="md"/>
                        <Group position="center">
                            <Button type="submit">Submit</Button>
                        </Group>
                    </form>
                </Box>
            </Modal>
        </>
    );
}