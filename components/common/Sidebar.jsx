import styles from "@/styles/components/common/sidebar.module.scss";
import Image from "next/image";
import IconGraduation from "@/public/assets/images/icon-graduation.svg";
import { auth } from "@/auth";
import SidebarLinks from "./SidebarLinks";
import LogoutButton from "./LogoutButton";

export default async function Sidebar() {
  const session = await auth();

  return (
    <nav className={styles.container}>
      <div className={styles.avatarContainer}>
        <div className={styles.AvatarInnerContainer}>
          <Image
            src={IconGraduation}
            alt="Graduation Cap Icon"
            title={`${session?.user?.name} ${session?.user?.surname}`}
            className={styles.avatar}
          />
        </div>
      </div>

      <div className={styles.linkContainer}>
        <SidebarLinks role={session?.user?.role} />
      </div>

      <div className={styles.logoutContainer}>
        <LogoutButton />
      </div>
    </nav>
  );
}
