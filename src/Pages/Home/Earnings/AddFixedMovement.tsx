import {useContext, useState} from 'react';
import {
    Modal,
    Button,
    Group,
    SimpleGrid,
    TextInput,
    Space, Anchor, Center, Box, createStyles, NumberInput, Select
} from '@mantine/core';
import {MdDateRange, MdDriveFileRenameOutline, MdOutlineAttachMoney, MdTextFields} from "react-icons/md";
import {useForm} from "@mantine/form";
import earningsActions from "../../../Services/Actions/Fixed_Movement/fixedEarning.action";
import {AccountContext} from "../../WalletFriend";
import {useNavigate} from "react-router-dom";
import {DatePicker} from "@mantine/dates";

export default function AddFixedMovement({
                                        opened,
                                        setOpened
                                    }: { opened: boolean, setOpened: (opened: (o: any) => boolean) => void }) {
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();
    const {account} = useContext<any>(AccountContext);

    const form = useForm({
        initialValues: {
            name: '',
            amount: undefined,
            repeat_date: undefined,
            temporary_type: '',
        },
        validate: {
            name: (value) => (value.length > 0 ? null : 'A name is required'),
            amount: (value) => (value === undefined ? 'An amount is required' :null ),
            repeat_date: (value) => (value === undefined ?  'A date is required': null),

        }
    });
    function handleSubmit(values: any,  account:any) {
        setVisible(true);
        earningsActions(values,account)
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
                                label="Amount"
                                placeholder="Enter an amount"
                                radius="md"
                                min ={0}
                                size="md"
                                icon={<MdOutlineAttachMoney/>}
                                {...form.getInputProps('amount')}
                            />

                        </SimpleGrid>

                        <Space h="md"/>

                        <SimpleGrid cols={1} breakpoints={[{maxWidth: 'sm', cols: 1}]}>
                            <DatePicker
                                withAsterisk
                                placeholder="Pick date"
                                label="Repeat date"
                                radius="md"
                                size="md"
                                minDate={new Date()}
                                icon={<MdDateRange/>}
                                {...form.getInputProps('repeat_date')}
                            />
                        </SimpleGrid>
                        <Space h="md"/>
                        <SimpleGrid cols={1} breakpoints={[{maxWidth: 'sm', cols: 1}]}>
                            <Select
                                label="Time"
                                placeholder="Pick one"
                                data={[
                                    { value: "", label: "Select an option", disabled: true},
                                    { value: 'monthly', label: 'Monthly' },
                                    { value: 'twice a month', label: 'Twice a month' },
                                    { value: 'weekly', label: 'Weekly' },

                                ]}
                                {...form.getInputProps('temporary_type')}
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