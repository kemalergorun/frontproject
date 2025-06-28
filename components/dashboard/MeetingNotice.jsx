import styles from "@/styles/components/dashboard/grades.module.scss";
import LinkTitle from "../common/LinkTitle";
import { Suspense } from "react";
import SkeletonLoader from "../common/SkeletonLoader";
import MeetingNoticeLoader from "../loaders/MeetingNoticeLoader";

export default function MeetingNotice() {
  return (
    <div className={styles.container}>
      <LinkTitle href="/dashboard/meetings" title="Meetings" />

      <hr className={styles.hr} />

      <div className={styles.chartContainer}>
        <Suspense fallback={<SkeletonLoader height="300px" />}>
          <MeetingNoticeLoader />
        </Suspense>
      </div>
    </div>
  );
}
