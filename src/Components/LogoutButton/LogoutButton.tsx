import {ActionIcon, useMantineColorScheme} from '@mantine/core';
import {MdExitToApp} from "react-icons/md";
import logoutAction from "../../Services/Actions/Logout/logout.action";
import {useMatch, useNavigate} from "react-router-dom";
//MdExitToApp
//MdLogout

export default function LogoutButton() {
    let match = useMatch("/auth/*");
    const navigate = useNavigate();
    const {colorScheme} = useMantineColorScheme();
    const dark = colorScheme === 'dark';

    return (
        <ActionIcon size="xl" color={dark ? 'gray' : 'indigo'} onClick={() => {logoutAction(); navigate("/auth/login")}} hidden={match !== null}>
            {dark ? (
                <MdExitToApp style={{width: 40, height: 40}}/>
            ) : (
                <MdExitToApp style={{width: 40, height: 40}}/>
            )}
        </ActionIcon>
    );
}