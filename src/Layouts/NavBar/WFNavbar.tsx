import {Navbar, Text} from "@mantine/core";
import {useMatch} from "react-router-dom";

export default function WFNavbar({opened}: { opened: boolean }) {
    let match = useMatch("/auth/*");

    return (
        <div hidden={match !== null}>
            <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{sm: 200, lg: 300}}>
                <Text>Application navbar</Text>
            </Navbar>
        </div>
    );
}