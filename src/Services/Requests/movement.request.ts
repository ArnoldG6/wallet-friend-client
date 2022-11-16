import Movement from "../../Types/Account/movement.types";
import getAxiosInstance from "../../Middleware/http-common";
import BagMovement from "../../Types/Account/bagMovement.types";
import successNotification from "../Utils/Notifications/success.util";
import errorNotification from "../Utils/Notifications/error.util";
import singleMovement from "../../Types/Account/singleMovement.types";

class MovementRequest {
    async createSingleMovement(data: singleMovement) {
        return await getAxiosInstance().post<any>("/movements/single", data)
    .then(function (response) {
            // handle success
            successNotification("Success", "You have successfully added a new movement!");
            return true;
        })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    errorNotification("Uh oh!", error.response.data.message);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    errorNotification("Uh oh!", "There was an error connecting to the server.");
                } else {
                    // Something happened in setting up the request that triggered an Error
                    errorNotification("Uh oh!", "There was an unexpected error.");
                }
            });
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