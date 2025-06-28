import styles from "@/styles/components/dashboard/grades.module.scss";
import LinkTitle from "../common/LinkTitle";
import { Suspense } from "react";
import SkeletonLoader from "../common/SkeletonLoader";
import GradeCardsLoader from "../loaders/GradeCardsLoader";

export default function Grades() {
  return (
    <div className={styles.container}>
      <LinkTitle href="/dashboard/grades" title="Grades" />

      <hr className={styles.hr} />

      <div className={styles.chartContainer}>
        <Suspense fallback={<SkeletonLoader height="300px" />}>
          <GradeCardsLoader />
        </Suspense>
      </div>
    </div>
  );
}
