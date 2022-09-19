import {Box, Center, Anchor, Stack} from "@mantine/core";
import {Link} from "react-router-dom";

export default function NotFound() {
    return (
        <Box sx={(theme) => ({
            padding: theme.spacing.xl,
            height: "100%",

        })}
        >
            <Center>
                <Stack align="center">
                    <h1>
                        404 - Page not found
                    </h1>
                    <Anchor component={Link} to={`/auth`}>
                        Go to our main page
                    </Anchor>
                </Stack>
            </Center>
        </Box>
    );
}