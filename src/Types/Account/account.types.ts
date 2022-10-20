import Movement from "./movement.types";
import FixedMovement from "./fixedMovement.types";
import Bag from "./bag.types";

export default interface Account {
    id: number,
    owner: string, // username of the owner
    creation_datetime: Date,
    total_balance: number,
    single_incomes: Array<Movement>,
    single_expenses: Array<Movement>,
    fixed_incomes: Array<FixedMovement>,
    fixed_expenses: Array<FixedMovement>,
    bags: Array<Bag>,
}