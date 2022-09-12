import {Navbar, Text} from "@mantine/core";

export default function WFNavbar({opened}: { opened: boolean }) {

    return (
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
            <Text>Application navbar</Text>
        </Navbar>
    );
}