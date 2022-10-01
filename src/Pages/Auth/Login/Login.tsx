import {
    Box,
    Button,
    Divider,
    Group,
    PasswordInput,
    TextInput,
    Space,
    Anchor,
    LoadingOverlay, Title, Container
} from '@mantine/core';
import {MdPermIdentity, MdAlternateEmail, MdOutlineLock} from "react-icons/md"
import {useForm} from "@mantine/form";
import {Link, useLocation, useNavigate} from "react-router-dom";
import loginAction from "../../../Services/Actions/Login/login.action";
import {useState} from "react";

export default function Login() {
    const navigate = useNavigate();
    let location = useLocation();
    const [visible, setVisible] = useState(false);


    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (value.length > 0 ? null : 'Password is required'),
        }
    })

    function handleSubmit(values: any) {
        setVisible(true);
        loginAction(values)
            .then((success) => {
                if (success) {
                    setVisible(false);
                    let from = location.state?.from?.pathname || "/home";
                    navigate(from, {replace: true});
                }
            })
            .catch(() => {
                setVisible(false);
            });
    }

    return (
        <Box
            sx={(theme) => ({
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                textAlign: 'center',
                padding: theme.spacing.xl,
                borderRadius: theme.radius.md,
                position: 'relative',
            })}
        >
            <Container size={400} my={20}>
                <Group position={"center"} spacing={"xs"}>
                    <Title
                        sx={(theme) => ({
                            fontSize: 26,
                            fontWeight: 900,
                            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                        })}
                    >
                        Login
                    </Title>
                    <MdPermIdentity size={50}/>
                </Group>
            </Container>

            <Divider my="md"/>

            <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                <LoadingOverlay visible={visible} overlayBlur={1} radius={"md"}/>
                <TextInput
                    withAsterisk
                    label="Email"
                    placeholder="your@email.com"
                    radius="md"
                    size="md"
                    icon={<MdAlternateEmail/>}
                    {...form.getInputProps('email')}
                />
                <Space h="md"/>
                <PasswordInput
                    withAsterisk
                    label="Password"
                    placeholder="Your password"
                    radius="md"
                    size="md"
                    icon={<MdOutlineLock/>}
                    {...form.getInputProps('password')}
                />
                <Space h="md"/>
                <Group position="center">
                    <Button type="submit">Submit</Button>
                </Group>
            </form>

            <Divider my="md"/>

            <Group position="center">
                <Anchor color="dimmed" size="sm" component={Link} to={`/auth/forgot-password`}>Forgot password?</Anchor>
                <Anchor color="dimmed" size="sm" component={Link} to={`/auth/register`}>Don't have an account?</Anchor>
            </Group>
        </Box>
    );
}