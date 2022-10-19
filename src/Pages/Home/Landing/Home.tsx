import {AccountContext, UserContext} from "../../WalletFriend";
import {useContext} from "react";

export default function Home() {
    const {user} = useContext(UserContext);
    const {account} = useContext(AccountContext);

    return (
        <div>
            <h1>Welcome {user?.first_name} {user?.last_name}!</h1>
            <h2>Your account balance is ${account?.total_balance}</h2>
        </div>
    );
}