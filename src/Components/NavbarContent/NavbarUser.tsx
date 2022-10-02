import { Group, Avatar, Text, Box } from '@mantine/core';
import {useContext} from "react";
import {UserContext} from "../../Pages/WalletFriend";

export default function NavbarUser() {
    const {user} = useContext<any>(UserContext);

    return (
        <Box
            sx={(theme) => ({
                paddingTop: theme.spacing.sm,
                borderTop: `1px solid ${
                    theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
                }`,
            })}
        >
            <Group>
                <Avatar radius="xl"/>
                <Box sx={{ flex: 1 }}>
                    <Text size="lg" weight={500}>
                        {user?.first_name} {user?.last_name}
                    </Text>
                    <Text color="dimmed" size="md">
                        {user?.email}
                    </Text>
                </Box>
            </Group>
        </Box>
    );
}