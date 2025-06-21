import styles from "@/styles/components/common/skeleton-loader.module.scss";
import { LoaderRing } from "./LoaderRing";

export default function SkeletonLoader({
  flex,
  height,
  width,
  isRing,
  rounded,
}) {
  const isRound = rounded ? styles.rounded : "";

  const skeletonStyles = {
    flex,
    height,
    width,
  };

  return (
    <div className={`${styles.skeleton} ${isRound}`} style={skeletonStyles}>
      {isRing || <LoaderRing />}
    </div>
  );
}
