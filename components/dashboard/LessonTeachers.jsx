import styles from "@/styles/components/dashboard/grades.module.scss";
import LinkTitle from "../common/LinkTitle";
import { Suspense } from "react";
import SkeletonLoader from "../common/SkeletonLoader";
import LessonTeachersLoader from "../loaders/LessonTeachersLoader";

export default function LessonTeachers() {
  return (
    <div className={styles.container}>
      <LinkTitle href="/dashboard/lessons" title="Teachers" />

      <hr className={styles.hr} />

      <div className={styles.chartContainer}>
        <Suspense fallback={<SkeletonLoader height="300px" />}>
          <LessonTeachersLoader />
        </Suspense>
      </div>
    </div>
  );
}
