import { Box } from '@mantine/core';

export default function Login() {

    return (
        <Box
            sx={(theme) => ({
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                textAlign: 'center',
                padding: theme.spacing.xl,
                borderRadius: theme.radius.md,
            })}
        >
            <p>holi</p>
        </Box>
    );
}