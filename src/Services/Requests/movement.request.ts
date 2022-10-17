import Movement from "../../Types/Account/movement.types";
import getAxiosInstance from "../../Middleware/http-common";
import BagMovement from "../../Types/Account/bagMovement.types";

class MovementRequest {
    async createSingleMovement(data: Movement) {
        return await getAxiosInstance().post<any>("/movements/single", data);
    }

    async createFixedMovement(data: Movement) {
        return await getAxiosInstance().post<any>("/movements/fixed", data);
    }

    async delete(movement_id: string) {
        return await getAxiosInstance().delete<any>(`/movements/${movement_id}`);
    }

    async assignToBag(data: BagMovement) {
        return await getAxiosInstance().post<any>("/movements/assign-to-bag", data);
    }
}

export default new MovementRequest();