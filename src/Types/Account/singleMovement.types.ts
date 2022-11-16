import BagMovement from "./bagMovement.types";

export default interface singleMovement {
    owner: number, // id of the account
    name: string,
    description: string,
    amount: number,
    available_amount: number,
}