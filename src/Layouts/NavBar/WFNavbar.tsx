import {Navbar} from "@mantine/core";
import {useMatch} from "react-router-dom";
import NavbarButton from "../../Components/NavbarContent/NavbarButton";
import {TbCurrencyDollar, TbPaperBag, TbReceipt, TbHome} from "react-icons/tb";
import NavbarUser from "../../Components/NavbarContent/NavbarUser";

export default function WFNavbar({opened}: { opened: boolean }) {
    let match = useMatch("/home/*");

    let matchHome = useMatch("/home");
    let matchBags = useMatch("/home/bags/*");
    let matchTransactions = useMatch("/home/transactions");
    let matchReports = useMatch("/home/reports");

    const elements = [
        {icon: <TbHome size={24}/>, color: 'blue', label: "Home", to: "/home", },
        {icon: <TbPaperBag size={24}/>, color: 'grape', label: "Categories", to: "/home/categories"},
        {icon: <TbCurrencyDollar size={24}/>, color: 'green', label: "Earnings", to: "/home/earnings"},
        {icon: <TbReceipt size={24}/>, color: 'red', label: "Expenses", to: "/home/expenses"},
    ];

    const links = elements.map((link) => <NavbarButton {...link} key={link.label}/>)

    return (
        <div hidden={match === null}>
            <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{sm: 200, lg: 300}}>
                <Navbar.Section grow mt="md">{links}</Navbar.Section>
                <Navbar.Section> <NavbarUser/> </Navbar.Section>
            </Navbar>
        </div>
    );
}