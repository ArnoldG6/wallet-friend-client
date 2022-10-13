import BagMovement from "./bagMovement.types";

export default interface Movement {
    owner: string, // id of the account
    creation_datetime: Date,
    name: string,
    description: string,
    amount: number,
    available_amount: number,
    bagMovements: Array<BagMovement>,
}