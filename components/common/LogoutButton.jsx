"use client";

import { logout } from "@/actions/auth/logout.action";
import styles from "@/styles/components/common/logout-button.module.scss";
import { swalToast } from "@/utils/functions/swal/swal-toast";
import { IoIosLogOut } from "react-icons/io";

export default function LogoutButton() {
  const handleClick = async () => {
    try {
      swalToast({
        title: "Are you sure you want to logout?",
        icon: "question",
        showCancelButton: true,
        showConfirmButton: true,
      }).then(async (response) => {
        if (!response.isConfirmed) return;

        await logout();
      });
    } catch (error) {
      swalToast({
        title: "There was a problem logging out. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <button
      type="button"
      title="Logout"
      className={styles.button}
      onClick={handleClick}
    >
      <span>
        <IoIosLogOut size={30} />
      </span>
      <span>Logout</span>
    </button>
  );
}
