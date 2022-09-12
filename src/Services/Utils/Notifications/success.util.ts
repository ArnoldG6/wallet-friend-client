import {showNotification} from "@mantine/notifications";

export default function successNotification(title: string, message: string) {
    showNotification({
        title: title,
        message: message,
        color: "green",
        autoClose: 5000,
        radius: "md",
    });
}