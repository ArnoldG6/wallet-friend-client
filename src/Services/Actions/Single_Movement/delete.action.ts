import MovementRequest from "../../Requests/movement.request";

export default function DeleteAction(id: string) {

    return MovementRequest.delete(id).then(success => {
        return success;
    });

}
