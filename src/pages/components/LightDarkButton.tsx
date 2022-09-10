import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import {MdOutlineNightsStay} from "react-icons/md"
import {MdOutlineWbSunny} from "react-icons/md"
import WhiteLogo from "../../assets/images/logos/Wallet-Friend-logos_white.png";
function LightAndDarkModeButton() {
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
export default LightAndDarkModeButton;