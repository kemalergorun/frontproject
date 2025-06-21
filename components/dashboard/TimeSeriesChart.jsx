import styles from "@/styles/components/dashboard/time-series-chart.module.scss";
import LinkTitle from "../common/LinkTitle";
import { Suspense } from "react";
import SkeletonLoader from "../common/SkeletonLoader";
import TimeSeriesLoader from "../loaders/TimeSeriesLoader";

export default function TimeSeriesChart({ role }) {
  const title = `${role === "TEACHER" ? "Meetings" : "Messages"} Through Time`;

  const href = `/dashboard/manage/${
    role === "TEACHER" ? "/meetings" : "message"
  }`;

  return (
    <div className={styles.container}>
      <LinkTitle href={href} title={title} />
      <hr className={styles.hr} />
      <div className={styles.chartContainer}>
        <Suspense fallback={<SkeletonLoader height="300px" />}>
          <TimeSeriesLoader role={role} />
        </Suspense>
      </div>
    </div>
  );
}
