import MDSnackbar from "components/MDSnackbar";
import { useState } from "react";

const useNotification = () => {
    const [notifications, setNotifications] = useState([]);

    const showNotification = (color, icon, title, content, dateTime) => {
        const id = new Date().getTime();
        setNotifications((prev) => [
            ...prev,
            { id, color, icon, title, content, dateTime, open: true },
        ]);
    };

    const closeNotification = (id) => {
        setNotifications((prev) =>
            prev.map((notification) =>
                notification.id === id ? { ...notification, open: false } : notification
            )
        );
    };

    const renderNotifications = notifications.map((notification) => (
        <MDSnackbar
            key={notification.id}
            color={notification.color}
            icon={notification.icon}
            title={notification.title}
            content={notification.content}
            dateTime={notification.dateTime}
            open={notification.open}
            onClose={() => closeNotification(notification.id)}
            close={() => closeNotification(notification.id)}
            bgWhite
        />
    ));

    return { showNotification, renderNotifications };
};

export default useNotification;