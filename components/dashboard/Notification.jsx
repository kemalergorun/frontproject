import styles from "@/styles/components/dashboard/notifications.module.scss";
import { IoMdNotifications } from "react-icons/io";

export default function Notification() {
  const notificationCount = 3;
  const title = `You have ${notificationCount} notification${
    notificationCount > 1 ? "s" : ""
  }`;

  return (
    <div className={styles.container} title={title}>
      <IoMdNotifications size={24} className={styles.icon} />

      {notificationCount > 0 && (
        <div className={styles.badge}>{notificationCount}</div>
      )}
    </div>
  );
}
