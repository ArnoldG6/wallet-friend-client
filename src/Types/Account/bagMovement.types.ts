import Bag from "./bag.types";

export default interface BagMovement {
    creation_datetime: Date,
    bag: Bag,
    amount: number,
}