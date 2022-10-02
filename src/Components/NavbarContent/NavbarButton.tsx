import React from "react";
import {Text, Group, ThemeIcon, UnstyledButton} from '@mantine/core';
import {useNavigate} from "react-router-dom";

interface NavbarProps {
    icon: React.ReactNode;
    color: string;
    label: string;
    to: string;
}

export default function NavbarButton({ icon, color, label, to }: NavbarProps) {
    const navigate = useNavigate();

    return (
        <UnstyledButton
            sx={(theme) => ({
                display: 'block',
                width: '100%',
                padding: theme.spacing.xs,
                borderRadius: theme.radius.sm,
                color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

                '&:hover': {
                    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
                }
            })}
            onClick={() => navigate(to)}
        >
            <Group>
                <ThemeIcon color={color} size={36} variant="light">
                    {icon}
                </ThemeIcon>

                <Text size="xl">{label}</Text>
            </Group>
        </UnstyledButton>
    );
}