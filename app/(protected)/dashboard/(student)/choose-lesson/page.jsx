import { getLessonPrograms } from "@/actions/lesson-program/get-lesson-programs.action";
import NoDataAvailable from "@/components/common/NoDataAvailable";
import PageTitle from "@/components/common/PageTitle";
import ChooseLessonForm from "@/components/forms/ChooseLessonForm";
import styles from "@/styles/page.module.scss";

export default async function ChooseLessonPage() {
  const data = await getLessonPrograms();

  const isDataAvailable =
    data && data.status !== "error" && Array.isArray(data) && data?.length > 0;

  return (
    <>
      <PageTitle title="Choose Lesson" />
      <div className={styles.container}>
        {isDataAvailable ? (
          <ChooseLessonForm data={data} />
        ) : (
          <NoDataAvailable />
        )}
      </div>
    </>
  );
}
