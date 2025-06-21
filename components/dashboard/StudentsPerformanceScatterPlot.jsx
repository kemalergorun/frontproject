import styles from "@/styles/components/dashboard/credit-score-distribution.module.scss";
import LinkTitle from "../common/LinkTitle";
import { Suspense } from "react";
import SkeletonLoader from "../common/SkeletonLoader";
import PerformanceScatterLoader from "../loaders/PerformanceScatterLoader";

export default function StudentsPerformanceScatterPlot() {
  return (
    <div className={styles.container}>
      <LinkTitle href="/dashboard/manage/student" title="Student Performance" />
      <hr className={styles.hr} />
      <div className={styles.chartContainer}>
        <Suspense fallback={<SkeletonLoader height="300px" />}>
          <PerformanceScatterLoader />
        </Suspense>
      </div>
    </div>
  );
}
