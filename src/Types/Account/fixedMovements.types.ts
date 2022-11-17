export default interface FixedMovements {
    owner: number, // id of the account
    name: string,
    description: string,
    amount: number,
    available_amount: number,
    temporary_type: string,
    repeat_date: Date,
}