import styles from "@/styles/components/common/three-dots.module.scss";

export const ThreeDots = () => {
  return (
    <div className={styles.dotWrapper}>
      <div className={styles.dot}>.</div>
      <div className={styles.dot}>.</div>
      <div className={styles.dot}>.</div>
    </div>
  );
};
