import styles from "@/styles/components/dashboard/credit-score-distribution.module.scss";
import LinkTitle from "../common/LinkTitle";
import { Suspense } from "react";
import SkeletonLoader from "../common/SkeletonLoader";
import CreditScoreLoader from "../loaders/CreditScoreLoader";

export default function CreditScoreDistribution() {
  return (
    <div className={styles.container}>
      <LinkTitle
        href="/dashboard/manage/lesson"
        title="Credit Score Distribution"
      />
      <hr className={styles.hr} />
      <div className={styles.chartContainer}>
        <Suspense fallback={<SkeletonLoader height="300px" />}>
          <CreditScoreLoader />
        </Suspense>
      </div>
    </div>
  );
}
