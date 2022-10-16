import HistoricBagMovement from "./historicBagMovement.types";

export default interface Bag {
    owner: string, // id of the account
    balance: number,
    history: Array<HistoricBagMovement>,
    goal_balance?: number,
    done?: boolean,
    end_date?: Date,
}