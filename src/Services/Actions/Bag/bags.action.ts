import singleBag from "../../../Types/Account/singleBag.types";
import BagRequest from "../../Requests/bag.request";
export default function bagsAction(values: any, account:any) {
    const dataMovement : singleBag = {
        owner: account, // id of the account
        name: values.name,
        goal_balance: values.goal_balance,
        end_date: values.end_date.toLocaleDateString("en-GM"),
    };
    console.log(dataMovement);
    return BagRequest.create(dataMovement).then(success => {
        return success;
    });

}
