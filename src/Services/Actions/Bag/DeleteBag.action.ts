import BagRequest from "../../Requests/bag.request";
export default function DeleteBagAction(id: string) {

    return BagRequest.delete(id).then(success => {
        return success;
    });

}
