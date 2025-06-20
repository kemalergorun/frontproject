import styles from "@/styles/components/common/plus-link.module.scss";
import Link from "next/link";

export default function PlusLink({ children, href = "/", title }) {
  return (
    <Link href={href} title={`Create a new ${title}`} className={styles.link}>
      {children}
      <button
        type="button"
        className={styles.plusButton}
        title={`Create a new ${title}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={styles.svg}
        >
          <path
            d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
            strokeWidth="1.5"
          ></path>
          <path d="M8 12H16" strokeWidth="1.5"></path>
          <path d="M12 16V8" strokeWidth="1.5"></path>
        </svg>
      </button>
    </Link>
  );
}
