import styles from "@/styles/list.module.scss";
import NoDataAvailable from "../common/NoDataAvailable";
import LessonCard from "../cards/LessonCard";
import Pagination from "../common/Pagination";
import { calculateOrderNumber } from "@/utils/functions/calculate-order-number";
import { getLessonsByPage } from "@/actions/lesson/get-lessons-by-page.action";
import { deleteLesson } from "@/actions/lesson/delete-lesson.action";

export default async function LessonList({ page, size, sort, type }) {
  const data = await getLessonsByPage({ page: page - 1, size, sort, type });

  const isDataAvailable =
    data &&
    data.status !== "error" &&
    Array.isArray(data?.content) &&
    data?.content?.length > 0;

  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        {isDataAvailable ? (
          data.content.map((item, index) => (
            <LessonCard
              key={index}
              data={item}
              orderNumber={calculateOrderNumber(page, size, index)}
              deleteAction={deleteLesson}
            />
          ))
        ) : (
          <NoDataAvailable />
        )}
      </div>
      <hr className={styles.hr} />
      <Pagination
        baseUrl="/dashboard/manage/lesson"
        currentPage={+page}
        size={size}
        totalPages={data?.totalPages}
      />
    </div>
  );
}
