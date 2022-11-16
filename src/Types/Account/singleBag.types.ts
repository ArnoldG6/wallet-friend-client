import HistoricBagMovement from "./historicBagMovement.types";

export default interface singleBag {
    owner: string, // id of the account
    name: string,
    goal_balance?: number,
    end_date?: Date,
}