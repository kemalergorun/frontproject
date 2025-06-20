import { auth } from "@/auth";
import styles from "@/styles/pages/unauthorized-page.module.scss";
import Image from "next/image";
import Gandalf from "@/public/assets/images/unauthorized.png";
import Link from "next/link";

export default async function UnauthorizedPage() {
  const session = await auth();

  const role = session?.user?.role;

  return (
    <div className={styles.container}>
      {Array.from({ length: 8 }).map((_, index) => (
        <div className={styles.blob} key={index}></div>
      ))}

      <div className={styles.contentContainer}>
        <h1 className={styles.title}>You shall not pass!</h1>
        <p className={styles.description}>The page is beyond you</p>
        {role.toLowerCase() === "admin" && (
          <p className={styles.description}>
            For even the very authorized cannot see all pages
          </p>
        )}
      </div>

      <Image
        src={Gandalf}
        alt="You shall not pass"
        title="You shall not pass"
        className={styles.image}
      />

      <Link
        href="/dashboard"
        title="Fly back to safety"
        className={styles.back}
      >
        Fly Back to Safety
      </Link>
    </div>
  );
}
