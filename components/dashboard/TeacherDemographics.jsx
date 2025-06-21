import styles from "@/styles/components/dashboard/teacher-demographics.module.scss";
import LinkTitle from "../common/LinkTitle";
import { Suspense } from "react";
import SkeletonLoader from "../common/SkeletonLoader";
import AdvisorStatusLoader from "../loaders/AdvisorStatusLoader";

export default function TeacherDemographics() {
  return (
    <div className={styles.container}>
      <LinkTitle
        href="/dashboard/manage/teacher"
        title="Teacher Demographics"
      />
      <hr className={styles.hr} />
      <div className={styles.chartContainer}>
        <Suspense fallback={<SkeletonLoader height="300px" />}>
          <AdvisorStatusLoader />
        </Suspense>
      </div>
    </div>
  );
}
