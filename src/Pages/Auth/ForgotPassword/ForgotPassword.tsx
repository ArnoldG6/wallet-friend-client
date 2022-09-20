import {
    createStyles,
    Title,
    Text,
    TextInput,
    Button,
    Container,
    Group,
    Anchor,
    Center,
    Box,
    Divider,
    Space
} from '@mantine/core';
import {IconArrowLeft} from '@tabler/icons';
import {Link, useNavigate} from "react-router-dom";
import {MdAlternateEmail} from "react-icons/md";
import {useForm} from "@mantine/form";
import resetPasswordAction from "../../../Services/Actions/PasswordReset/passwordReset.action";

export function ForgotPassword() {
    const navigate = useNavigate();
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

    const {classes} = useStyles();
    const form = useForm({
        initialValues: {
            email: '',
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        }
    });

    function handleSubmit(values: any) {
        resetPasswordAction(values).then(success => {
            if (success) {
                navigate("/login", {replace: true});
            }
        })
    }

    return (

        <Box
            sx={(theme) => ({
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                textAlign: 'center',
                padding: theme.spacing.xl,
                borderRadius: theme.radius.md,
            })}
        >
            <Container size={460} my={30}>
                <Title className={classes.title} align="center">
                    Forgot your password?
                </Title>
                <Text color="dimmed" size="sm" align="center">
                    Enter your email to get a reset link
                </Text>
            </Container>

            <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
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
                <Group position="center">
                    <Button type="submit">Reset Password</Button>
                </Group>
            </form>
            <Divider my="md"/>
            <Group position="apart" mt="lg" className={classes.controls}>
                <Anchor color="dimmed" size="sm" className={classes.control} component={Link} to="/auth/login">
                    <Center inline>
                        <IconArrowLeft size={12} stroke={1.5}/>
                        <Box ml={5}>Back to login page</Box>
                    </Center>
                </Anchor>
            </Group>
        </Box>
    );
}

