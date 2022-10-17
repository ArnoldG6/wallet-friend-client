import BagMovement from "./bagMovement.types";

export default interface FixedMovement {
    owner: number, // id of the account
    creation_datetime: Date,
    name: string,
    description: string,
    amount: number,
    available_amount: number,
    bagMovements: Array<BagMovement>,
    temporary_type: string,
    repeat_date: Date,
}