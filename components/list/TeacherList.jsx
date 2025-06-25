import styles from "@/styles/list.module.scss";
import NoDataAvailable from "../common/NoDataAvailable";
import AdminCard from "../cards/AdminCard";
import Pagination from "../common/Pagination";
import { calculateOrderNumber } from "@/utils/functions/calculate-order-number";
import { deleteManager } from "@/actions/manager/delete-manager.action";
import { getTeacherByPage } from "@/actions/teacher/get-teacher-by-page.action";
import { deleteTeacher } from "@/actions/teacher/delete-teacher.action";

export default async function TeacherList({ page, size, sort, type }) {
  const data = await getTeacherByPage({
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
            <AdminCard
              key={index}
              data={item}
              orderNumber={calculateOrderNumber(page, size, index)}
              isEditButton
              deleteAction={deleteTeacher}
              type="teacher"
            />
          ))
        ) : (
          <NoDataAvailable />
        )}
      </div>
      <hr className={styles.hr} />
      <Pagination
        baseUrl="/dashboard/manage/teacher"
        currentPage={+page}
        size={size}
        totalPages={data?.totalPages}
      />
    </div>
  );
}
