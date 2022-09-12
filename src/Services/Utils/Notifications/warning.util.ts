import {showNotification} from "@mantine/notifications";

export default function warningNotification(title: string, message: string) {
    showNotification({
        title: title,
        message: message,
        color: "yellow",
        autoClose: 5000,
        radius: "md",
    });
}