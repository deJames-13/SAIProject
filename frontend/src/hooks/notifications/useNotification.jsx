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

    const showError = (title, content) => {
        showNotification("error", "error", title, content);
    }

    const showSuccess = (title, content) => {
        showNotification("success", "check_circle", title, content);
    }

    const showInfo = (title, content) => {
        showNotification("info", "info", title, content);
    }

    const showWarning = (title, content) => {
        showNotification("warning", "warning", title, content);
    }


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

    return {
        showNotification,
        renderNotifications,
        error: showError,
        success: showSuccess,
        info: showInfo,
        warning: showWarning,


    };
};

export default useNotification;