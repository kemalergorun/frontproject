import styles from "@/styles/components/dashboard/grades.module.scss";
import LinkTitle from "../common/LinkTitle";
import { Suspense } from "react";
import SkeletonLoader from "../common/SkeletonLoader";
import LessonProgramsLoader from "../loaders/LessonProgramsLoader";

export default function LessonPrograms() {
  return (
    <div className={styles.container}>
      <LinkTitle href="/dashboard/lessons" title="Lesson Programs" />

      <hr className={styles.hr} />

      <div className={styles.chartContainer}>
        <Suspense fallback={<SkeletonLoader height="300px" />}>
          <LessonProgramsLoader />
        </Suspense>
      </div>
    </div>
  );
}
