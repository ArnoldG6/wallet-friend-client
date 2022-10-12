import Bag from "../../Types/Account/bag.types";
import getAxiosInstance from "../../Middleware/http-common";

class BagRequest {
    async create(data: Bag) {
        return await getAxiosInstance().post<any>("/bags", data);
    }

    async delete(id: string) {
        return await getAxiosInstance().delete<any>(`/bags/${id}`);
    }

}

export default new BagRequest();