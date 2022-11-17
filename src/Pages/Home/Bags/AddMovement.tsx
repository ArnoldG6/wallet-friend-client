import React, {forwardRef, useContext} from 'react';
import {
    Group,
    Text,
    Select,
    Modal, Box, SimpleGrid, TextInput, Space, NumberInput, Button,
} from '@mantine/core';
import {AccountContext} from "../../WalletFriend";
import {MdReceipt, MdMoney} from "react-icons/md";
import {useForm} from "@mantine/form";
import assignToBagActions from "../../../Services/Actions/Bag/asignMovement.action";
import {useNavigate} from "react-router-dom";


interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
    label: string;
    description: string;
    amount:string | number;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
    ({label, description, amount, ...others }: ItemProps, ref) => (
        <div ref={ref} {...others}>
            <Group noWrap>
                { (amount > 0 ? <MdMoney size={25} color="green"/>: <MdReceipt size={25} color="red"/>) }
                <div>
                    <Text size="sm">{label}</Text>
                    <Text size="xs" >
                        {description}
                    </Text>
                    <Text size="xs" color={amount === undefined ? "white" : amount> 0 ? "green" : "red"}>
                        {'$' +amount}
                    </Text>
                </div>
            </Group>
        </div>
    )
);

export default  function AddMovement({opened, setOpened, id}: { opened: boolean, setOpened: (opened: (o: any) => boolean) => void, id:any }) {
    const {account} = useContext(AccountContext);
    const navigate= useNavigate();
    const data1 =account?.single_incomes.slice();
    const data2= account?.single_expenses.slice();
    // @ts-ignore
    const optionsIncomes =data1.map((data) => (
        {

            label: data.name.toString(),
            value: data.id.toString(),
            description: data.description.toString(),
            amount: data.amount,
        }
    ));
    // @ts-ignore
    const optionsExpenses =data2.map((data) => (
        {

            label: data.name.toString(),
            value: data.id.toString(),
            description: data.description.toString(),
            amount: data.amount,
        }
    ));
const data= optionsIncomes.concat(optionsExpenses)
    const form = useForm({
        initialValues: {
            add_movement: '',
        },
        validate: {
            add_movement: (value) => (value.length > 0 ? null : 'Select an option is required'),

        }
    });
    function handleAction(values: any, id:any, amount:any) {
        assignToBagActions(values ,id, amount)
            .then(success => {
                if (success){
                    setOpened((o) => !o);
                    window.location.reload();
                }
            })
            .catch(() => {
            })
    }
    return (
    <>
        <Modal
            opened={opened}
            onClose={() => setOpened((o) => !o)}
            title="Add new movement!"
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
                <form onSubmit={form.onSubmit((values) => handleAction(values,  id, (data.find(data=> data.value ===values.add_movement)?.amount)))}>
                    <SimpleGrid cols={1} breakpoints={[{maxWidth: 'sm', cols: 1}]}>
                        <Select
                            label="Choose a movement"
                            placeholder="Pick one"
                            itemComponent={SelectItem}
                            data={data}
                            searchable
                            maxDropdownHeight={400}
                            nothingFound="Nobody here"
                            filter={(value, item) =>
                                item.label?.toLowerCase().includes(value.toLowerCase().trim()) ||
                                item.description.toLowerCase().includes(value.toLowerCase().trim())
                            }
                            {...form.getInputProps('add_movement')}
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