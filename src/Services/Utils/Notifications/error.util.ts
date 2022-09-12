import {showNotification} from "@mantine/notifications";

export default function errorNotification(title: string, message: string) {
    showNotification({
        title: title,
        message: message,
        color: "red",
        autoClose: 5000,
        radius: "md",
    });
}