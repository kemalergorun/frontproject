import styles from "@/styles/list.module.scss";
import NoDataAvailable from "../common/NoDataAvailable";
import LessonProgramCard from "../cards/LessonProgramCard";
import Pagination from "../common/Pagination";
import { calculateOrderNumber } from "@/utils/functions/calculate-order-number";
import { getLessonProgramsByPage } from "@/actions/lesson-program/get-lesson-programs-by-page.action";

export default async function LessonProgramList({ page, size, sort, type }) {
  const data = await getLessonProgramsByPage({
    page: page - 1,
    size,
    sort,
    type,
  });

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
            <LessonProgramCard
              key={index}
              data={item}
              orderNumber={calculateOrderNumber(page, size, index)}
              authorized={true}
            />
          ))
        ) : (
          <NoDataAvailable />
        )}
      </div>
      <hr className={styles.hr} />
      <Pagination
        baseUrl="/dashboard/manage/lesson-program"
        currentPage={+page}
        size={size}
        totalPages={data?.totalPages}
      />
    </div>
  );
}
