import {Box, Button, Divider, Group, MediaQuery, PasswordInput, TextInput, Space, Anchor} from '@mantine/core';
import {MdPermIdentity, MdAlternateEmail, MdOutlineLock} from "react-icons/md"
import {useForm} from "@mantine/form";
import {Link, useRouteMatch} from "react-router-dom";
import loginAction from "../../../Services/Actions/Login/login.action";

export default function Login() {
    let { path } = useRouteMatch();
    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        }
    })

    return (
        <Box
            sx={(theme) => ({
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                textAlign: 'center',
                padding: theme.spacing.xl,
                borderRadius: theme.radius.md,
            })}
        >
            <MediaQuery smallerThan="md" styles={{display: "none"}}>
                <MdPermIdentity size={100}/>
            </MediaQuery>
            <MediaQuery largerThan="md" styles={{display: "none"}}>
                <MdPermIdentity size={50}/>

            </MediaQuery>

            <Divider my="md"/>

            <form onSubmit={form.onSubmit((values) => loginAction(values))}>
                <TextInput
                    withAsterisk
                    label="Email"
                    placeholder="your@email.com"
                    radius="md"
                    size="md"
                    icon={<MdAlternateEmail/>}
                    {...form.getInputProps('email')}
                />
                <Space h="md" />
                <PasswordInput
                    withAsterisk
                    label="Password"
                    placeholder="Your password"
                    radius="md"
                    size="md"
                    icon={<MdOutlineLock/>}
                    {...form.getInputProps('password')}
                />
                <Space h="md" />
                <Group position="center">
                    <Button type="submit">Submit</Button>
                </Group>
            </form>

            <Divider my="md"/>

            <Group position="center">
                <Anchor component={Link} to={`${path}/reset-password`}>Forgot password?</Anchor>
                <Anchor component={Link} to={`${path}/signup`}>Don't have an account?</Anchor>
            </Group>
        </Box>
    );
}