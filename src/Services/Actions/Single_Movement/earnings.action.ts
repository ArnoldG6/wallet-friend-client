import MovementRequest from "../../Requests/movement.request";
import singleMovement from "../../../Types/Account/singleMovement.types";
export default function EarningsAction(values: any, available_amount:any, account:any) {
    const dataMovement : singleMovement = {
        owner: account, // id of the account
        name: values.name,
        description: values.description,
        amount: (values.amount < 0 ? values.amount : -Math.abs(values.amount)),
        available_amount: (values.amount < 0 ? Math.abs(values.amount): values.amount),
    };
    return MovementRequest.createSingleMovement(dataMovement).then(success => {
        return success;
    });

}
