import {ActionIcon, useMantineColorScheme} from '@mantine/core';
import {MdExitToApp} from "react-icons/md";
import {useRouteMatch} from "react-router-dom";
import logoutAction from "../../Services/Actions/Logout/logout.action";
//MdExitToApp
//MdLogout

export default function LogoutButton() {
    let {path} = useRouteMatch();
    const {colorScheme} = useMantineColorScheme();
    const dark = colorScheme === 'dark';

    return (
        <ActionIcon size="xl" color={dark ? 'gray' : 'indigo'} onClick={() => logoutAction()} hidden={path === "/auth"}>
            {dark ? (
                <MdExitToApp style={{width: 40, height: 40}}/>
            ) : (
                <MdExitToApp style={{width: 40, height: 40}}/>
            )}
        </ActionIcon>
    );
}