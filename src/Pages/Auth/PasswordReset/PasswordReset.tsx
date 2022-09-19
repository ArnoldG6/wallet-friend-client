import {createStyles, Title, Button, Container, Group, Space, Box, Text, Popover, PasswordInput, Progress} from '@mantine/core';
import {MdCheck, MdOutlineClear, MdOutlineLock} from "react-icons/md";
import {useForm} from "@mantine/form";
import {useState} from "react";
import {useInputState} from "@mantine/hooks";

export function ResetPassword() {
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
            password: '',
            confirmPassword: '',
        },
        validate: {
            confirmPassword: (valueCP) =>
                (valueCP !== value ? 'Passwords did not match' : null) || (valueCP.length > 0 ? null : 'Confirm Password is required'),
            password: () => (value.length > 0 ? null : 'Password is required') || (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[$&+,:;=?@#|'<>.^*()%!-,]).{8,}$/.test(value) ? null : 'Invalid password'),
        }
    });
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
                    Reset Password
                </Title>
                <Text color="dimmed" size="sm" align="center">
                    Please, add a new password
                </Text>
            </Container>

            <form onSubmit={form.onSubmit((values) => console.log(values))}>

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
                <Space h="md"/>
                <PasswordInput
                    withAsterisk
                    label="Confirm Password"
                    placeholder="Your password"
                    radius="md"
                    size="md"
                    icon={<MdOutlineLock/>}
                    {...form.getInputProps('confirmPassword')}
                />
                <Space h="md"/>
                <Group position="center">
                    <Button type="submit">Submit</Button>
                </Group>
            </form>
        </Box>
    );
}

