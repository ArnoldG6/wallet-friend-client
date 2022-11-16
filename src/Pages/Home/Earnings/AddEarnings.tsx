import {useContext, useState} from 'react';
import {
    Modal,
    Button,
    Group,
    SimpleGrid,
    TextInput,
    Space, Anchor, Center, Box, createStyles, NumberInput
} from '@mantine/core';
import {MdDriveFileRenameOutline, MdOutlineAttachMoney, MdTextFields} from "react-icons/md";
import {useForm} from "@mantine/form";
import earningsActions from "../../../Services/Actions/Movement/earnings.action";
import {AccountContext} from "../../WalletFriend";
import {useNavigate} from "react-router-dom";

export default function AddExpenses({
                                        opened,
                                        setOpened
                                    }: { opened: boolean, setOpened: (opened: (o: any) => boolean) => void }) {
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
            description: '',
            amount: undefined,

        },
        validate: {
            name: (value) => (value.length > 0 ? null : 'A name is required'),
            description: (value) => (value.length > 0 ? null : 'A description is required'),
            amount: (value) => (value === undefined ? 'An amount is required' :null ),

        }
    });
    function handleSubmit(values: any, available_amount:any, account:any) {
        setVisible(true);
        earningsActions(values, available_amount,account)
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
                title="Add new income!"
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
                    <form onSubmit={form.onSubmit((values) => handleSubmit(values, (account?.available_amount + values.amount), account?.id))}>
                        <SimpleGrid cols={2} breakpoints={[{maxWidth: 'sm', cols: 1}]}>
                            <TextInput
                                withAsterisk
                                label="Name"
                                placeholder="name"
                                radius="md"
                                size="md"
                                icon={<MdDriveFileRenameOutline/>}
                                {...form.getInputProps('name')}
                            />
                            <TextInput
                                withAsterisk
                                label="Description"
                                placeholder="write something"
                                radius="md"
                                size="md"
                                icon={<MdTextFields/>}
                                {...form.getInputProps('description')}
                            />
                        </SimpleGrid>
                        <Space h="md"/>

                        <SimpleGrid cols={1} breakpoints={[{maxWidth: 'sm', cols: 1}]}>
                            <NumberInput
                                withAsterisk
                                label="Amount"
                                placeholder="enter an amount"
                                radius="md"
                                min ={0}
                                size="md"
                                icon={<MdOutlineAttachMoney/>}
                                {...form.getInputProps('amount')}
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