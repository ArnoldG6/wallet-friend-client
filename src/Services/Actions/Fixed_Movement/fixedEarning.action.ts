import fixedMovement from "../../../Types/Account/fixedMovements.types";
import MovementRequest from "../../Requests/movement.request";

export default function FixedEarning(values: any, account: any) {
    const dataMovement: fixedMovement = {
        owner: account, // id of the account
        name: values.name,
        description: "[Automatic]",
        amount: (values.amount < 0 ? Math.abs(values.amount) : values.amount),
        available_amount: (values.amount < 0 ? Math.abs(values.amount) : values.amount),
        temporary_type: values.temporary_type,
        repeat_date: values.repeat_date.toLocaleDateString("en-GM"),
    };
    return MovementRequest.createFixedMovement(dataMovement).then(success => {
        return success;
    });

}
