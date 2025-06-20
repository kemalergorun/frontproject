import styles from "@/styles/components/common/avatar.module.scss";
import Image from "next/image";

export default function Avatar({
  width = 80,
  height = 80,
  rounded = false,
  src,
  title,
}) {
  const roundedStyle = rounded ? styles.rounded : "";

  if (!src) {
    return (
      <div
        className={`${styles.avatar} ${styles.noImage} ${roundedStyle}`}
        title={title}
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        {title[0]}
      </div>
    );
  }

  return (
    <Image
      src={src}
      height={height}
      width={width}
      alt={title}
      title={title}
      className={`${styles.avatar} ${roundedStyle}`}
    />
  );
}
