import {Box, Text} from "@mantine/core";
import {MdCheck, MdOutlineClear} from "react-icons/md";

export default function  PasswordRequirement({meets, label}: { meets: boolean; label: string }) {
    return (
        <Text color={meets ? 'teal' : 'red'} sx={{display: 'flex', alignItems: 'center'}} mt={7} size="sm">
        {meets ? <MdCheck size={14}/> : <MdOutlineClear size={14}/>} <Box ml={10}>{label}</Box>
        </Text>
);
}
