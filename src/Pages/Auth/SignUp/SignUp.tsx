import {
    Box,
    Button,
    Divider,
    Group,
    PasswordInput,
    TextInput,
    Space,
    Anchor,
    Progress,
    Popover,
    SimpleGrid, LoadingOverlay, Center, createStyles, Container, Title
} from '@mantine/core';
import {MdHowToReg, MdAlternateEmail, MdOutlineLock, MdAccountBox} from "react-icons/md"
import {useForm} from "@mantine/form";
import {Link, useNavigate} from "react-router-dom";
import {useInputState} from "@mantine/hooks";
import {useState} from "react";
import signUpActions from "../../../Services/Actions/SignUp/signUp.actions";
import {IconArrowLeft} from "@tabler/icons";
import PasswordRequirement from "../../../Services/Utils/Password/PasswordRequirement.utils";
import getStrength from "../../../Services/Utils/Password/Strength.utils";
import {requirements} from "../../../Services/Utils/Password/Requirements";

export default function SignUp() {
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
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);

    const [popoverOpened, setPopoverOpened] = useState(false);
    const [value, setValue] = useInputState('');
    const checks = requirements.map((requirement, index) => (
        <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(value)}/>
    ));
    const strength = getStrength(value);
    const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';
    const form = useForm({
        initialValues: {
            username: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            confirmPassword: '',
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            confirmPassword: (valueCP) =>
                (valueCP !== value ? 'Passwords did not match' : null) || (valueCP.length > 0 ? null : 'Confirm Password is required'),
            username: (value) => (value.length > 0 ? null : 'Username is required'),
            firstName: (value) => (value.length > 0 ? null : 'First name is required'),
            lastName: (value) => (value.length > 0 ? null : 'Last name is required'),
            password: () => (value.length > 0 ? null : 'Password is required') || (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[$&+,:;=?@#|'<>.^*()%!-,]).{8,}$/.test(value) ? null : 'Invalid password'),
        }
    });

    function handleSubmit(values: any) {
        setVisible(true);
        signUpActions(values)
            .then(success => {
                if (success) {
                    setVisible(false);
                    navigate("/home", {replace: true});
                }
            })
            .catch(() => {
                setVisible(false);
            })
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
                    <Title className={classes.title}>
                        Sign Up
                    </Title>
                    <MdHowToReg size={50}/>
                </Group>
            </Container>

            <Divider my="md"/>
            <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                <LoadingOverlay visible={visible} overlayBlur={1} radius={"md"}/>
                <SimpleGrid cols={2} breakpoints={[{maxWidth: 'sm', cols: 1}]}>
                    <TextInput
                        withAsterisk
                        label="Username"
                        placeholder="your username"
                        radius="md"
                        size="md"
                        icon={<MdAccountBox/>}
                        {...form.getInputProps('username')}
                    />
                    <TextInput
                        withAsterisk
                        label="Email"
                        placeholder="your@email.com"
                        radius="md"
                        size="md"
                        icon={<MdAlternateEmail/>}
                        {...form.getInputProps('email')}
                    />
                </SimpleGrid>
                <Space h="md"/>
                <SimpleGrid cols={2} breakpoints={[{maxWidth: 'sm', cols: 1}]}>
                    <TextInput
                        withAsterisk
                        label="First Name"
                        placeholder="your name"
                        radius="md"
                        size="md"
                        icon={<MdAccountBox/>}
                        {...form.getInputProps('firstName')}
                    />

                    <TextInput
                        withAsterisk
                        label="Last Name"
                        placeholder="your name"
                        radius="md"
                        size="md"
                        icon={<MdAccountBox/>}
                        {...form.getInputProps('lastName')}
                    />
                </SimpleGrid>
                <Space h="md"/>

                <SimpleGrid cols={2} breakpoints={[{maxWidth: 'sm', cols: 1}]}>

                    <Popover opened={popoverOpened} position="bottom" width="target" transition="pop">
                        <Popover.Target>
                            <div
                                onFocusCapture={() => setPopoverOpened(true)}
                                onBlurCapture={() => setPopoverOpened(false)}
                            >
                                <PasswordInput
                                    withAsterisk
                                    label="Password"
                                    placeholder="Your password"
                                    radius="md"
                                    size="md"
                                    icon={<MdOutlineLock/>}
                                    value={value}
                                    onChange={(event) => setValue(event.currentTarget.value)}
                                    error={form.errors.password}

                                />
                            </div>

                        </Popover.Target>
                        <Popover.Dropdown>
                            <Progress color={color} value={strength} size={5} style={{marginBottom: 10}}/>
                            <PasswordRequirement label="Includes at least 8 characters" meets={value.length > 7}/>
                            {checks}
                        </Popover.Dropdown>
                    </Popover>
                    <PasswordInput
                        withAsterisk
                        label="Confirm Password"
                        placeholder="Your password"
                        radius="md"
                        size="md"
                        icon={<MdOutlineLock/>}
                        {...form.getInputProps('confirmPassword')}
                    />
                </SimpleGrid>
                <Space h="md"/>
                <Group position="center">
                    <Button type="submit">Submit</Button>
                </Group>
            </form>

            <Divider my="md"/>
            <Group position="apart" mt="lg" className={classes.controls}>
                <Anchor color="dimmed" size="sm" component={Link} to="/auth/login" className={classes.control}>
                    <Center inline>
                        <IconArrowLeft size={12} stroke={1.5}/>
                        <Box ml={5}>Already have an account? Login</Box>
                    </Center>
                </Anchor>
            </Group>

        </Box>
    );
}