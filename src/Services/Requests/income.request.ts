import Movement from "../../Types/Account/movement.types";
import getAxiosInstance from "../../Middleware/http-common";
import BagMovement from "../../Types/Account/bagMovement.types";

class IncomeRequest {
    async createSingleMovement(data: Movement) {
        return await getAxiosInstance().post<any>("/incomes/single", data);
    }

    async createFixedMovement(data: Movement) {
        return await getAxiosInstance().post<any>("/incomes/fixed", data);
    }

    async delete(id: string) {
        return await getAxiosInstance().delete<any>(`/incomes/${id}`);
    }

    async assignToBag(data: BagMovement) {
        return await getAxiosInstance().post<any>("/incomes/assign-to-bag", data);
    }
}

export default new IncomeRequest();