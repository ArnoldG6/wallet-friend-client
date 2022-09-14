import {
    Box,
    Button,
    Divider,
    Group,
    MediaQuery,
    PasswordInput,
    TextInput,
    Space,
    Anchor,
    Text,
    Progress,
    Popover,
    SimpleGrid
} from '@mantine/core';
import {MdHowToReg, MdAlternateEmail, MdOutlineLock, MdAccountBox, MdCheck, MdOutlineClear} from "react-icons/md"
import {useForm} from "@mantine/form";
import {Link, useNavigate} from "react-router-dom";
import {useInputState} from "@mantine/hooks";
import {useState} from "react";
import signUpActions from "../../../Services/Actions/SignUp/signUp.actions";

export default function SignUp() {
    const navigate = useNavigate();
    function PasswordRequirement({meets, label}: { meets: boolean; label: string }) {
        return (
            <Text color={meets ? 'teal' : 'red'} sx={{display: 'flex', alignItems: 'center'}} mt={7} size="sm">
                {meets ? <MdCheck size={14}/> : <MdOutlineClear size={14}/>} <Box ml={10}>{label}</Box>
            </Text>
        );
    }

    function getStrength(password: string) {
        let multiplier = password.length > 9 ? 0 : 1;
        requirements.forEach((requirement) => {
            if (!requirement.re.test(password)) {
                multiplier += 1;
            }
        });
        return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
    }

    const requirements = [
        {re: /[0-9]/, label: 'Includes number'},
        {re: /[a-z]/, label: 'Includes lowercase letter'},
        {re: /[A-Z]/, label: 'Includes uppercase letter'},
        {re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol'},
    ];
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
                (valueCP !== value ? 'Passwords did not match' : null || valueCP.length > 0 ? null : 'Confirm Password is required'),
            username: (value) => (value.length > 0 ? null : 'Username is required'),
            firstName: (value) => (value.length > 0 ? null : 'First name is required'),
            lastName: (value) => (value.length > 0 ? null : 'Last name is required'),
            password: () => (value.length > 0 ? null : 'Password is required') || (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[$&+,:;=?@#|'<>.^*()%!-,]).{8,}$/.test(value) ? null : 'Invalid password'),
        }
    });

    function handleSubmit(values: any) {
        signUpActions(values).then(success => {
            if (success) {
                navigate("/home", {replace: true});
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
            <MediaQuery smallerThan="md" styles={{display: "none"}}>
                <MdHowToReg size={100}/>
            </MediaQuery>
            <MediaQuery largerThan="md" styles={{display: "none"}}>
                <MdHowToReg size={50}/>

            </MediaQuery>
            <Divider my="md"/>
            <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
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

            <Group position="center">
                <Anchor component={Link} to="/auth/login">Already have an account? Login</Anchor>
            </Group>
        </Box>
    );
}