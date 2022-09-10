import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import {MdOutlineNightsStay, MdOutlineWbSunny} from "react-icons/md"

export default function ThemeButton() {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';

    return (
        <ActionIcon size="xl"
            color={dark ? 'yellow' : 'blue'}
            onClick={() => toggleColorScheme()}
        >
            {dark ? (
                <MdOutlineWbSunny style={{ width: 40, height: 40 }} />
            ) : (
                <MdOutlineNightsStay style={{ width: 40, height: 40 }} />
            )}
        </ActionIcon>
    );
}