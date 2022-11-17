import BagRequest from "../../Requests/bag.request";
import AssignToBag from "../../../Types/Account/assignToBag.types";
import MovementRequest from "../../Requests/movement.request";
export default function assignMovement(values: any, id:any, amount:number) {
    const dataMovement : AssignToBag = {
        movement_id: values.add_movement, // id of the account
        bag_id: id,
        amount: amount,

    };
    console.log(dataMovement);
    return MovementRequest.assignToBag(dataMovement).then(success => {
        return success;
    });

}
