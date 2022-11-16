import MovementRequest from "../../Requests/movement.request";
import singleMovement from "../../../Types/Account/singleMovement.types";
export default function EarningsAction(values: any, available_amount:any, account:any) {
    const dataMovement : singleMovement = {
        owner: 1, // id of the account
        name: values.name,
        description: values.description,
        amount: (values.amount < 0 ? Math.abs(values.amount): values.amount),
        available_amount: 0,
    };
    return MovementRequest.createSingleMovement(dataMovement).then(success => {
        return success;
    });

}
