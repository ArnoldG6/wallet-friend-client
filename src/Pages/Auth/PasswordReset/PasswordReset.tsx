import {
    createStyles,
    Title,
    Button,
    Container,
    Group,
    Space,
    Box,
    Text,
    Popover,
    PasswordInput,
    Progress
} from '@mantine/core';
import {MdOutlineLock} from "react-icons/md";
import {useForm} from "@mantine/form";
import {useState} from "react";
import {useInputState} from "@mantine/hooks";
import PasswordRequirement from "../../../Services/Utils/Password/PasswordRequirement.utils";
import getStrength from "../../../Services/Utils/Password/Strength.utils";
import {requirements} from "../../../Services/Utils/Password/Requirements";

export function ResetPassword() {


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

