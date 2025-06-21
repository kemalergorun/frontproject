import styles from "@/styles/components/common/link-title.module.scss";
import Link from "next/link";

export default function LinkTitle({ href = "/", title = "Home" }) {
  return (
    <h2 className={styles.heading}>
      <Link href={href} title={`Go to ${title} page`} className={styles.link}>
        {title}
      </Link>
    </h2>
  );
}
