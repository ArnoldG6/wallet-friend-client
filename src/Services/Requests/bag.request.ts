import Bag from "../../Types/Account/bag.types";
import getAxiosInstance from "../../Middleware/http-common";
import singleBag from "../../Types/Account/singleBag.types";
import successNotification from "../Utils/Notifications/success.util";
import errorNotification from "../Utils/Notifications/error.util";

class BagRequest {
    async create(data: singleBag) {
        return await getAxiosInstance().post<any>("/bags/create", data)
            .then(function (response) {
                // handle success
                successNotification("Success", "You have successfully added a new bag!");
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

    async delete(id: string) {
        return await getAxiosInstance().delete<any>(`/bags/delete/${id}`)
            .then(function (response) {
                // handle success
                successNotification("Success", "You have successfully deleted a bag!");
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

}

export default new BagRequest();