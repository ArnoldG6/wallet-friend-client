import HistoricBagMovement from "./historicBagMovement.types";

export default interface Bag {
    id: number,
    owner: string, // id of the account
    name: string,
    balance: number,
    history: Array<HistoricBagMovement>,
    goal_balance?: number,
    done?: boolean,
    end_date?: Date,
}