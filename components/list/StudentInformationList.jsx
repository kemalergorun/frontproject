import styles from "@/styles/list.module.scss";
import NoDataAvailable from "../common/NoDataAvailable";
import StudentInformationCard from "../cards/StudentInformationCard";
import Pagination from "../common/Pagination";
import { calculateOrderNumber } from "@/utils/functions/calculate-order-number";
import { getStudentInformationByPageAsTeacher } from "@/actions/student-information/get-student-information-by-page-as-teacher.action";
import { deleteStudentInformation } from "@/actions/student-information/delete-student-information.action";

export default async function StudentInformationList({ page, size }) {
  const data = await getStudentInformationByPageAsTeacher({
    page: page - 1,
    size,
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
            <StudentInformationCard
              key={index}
              data={item}
              orderNumber={calculateOrderNumber(page, size, index)}
              deleteAction={deleteStudentInformation}
              type="teacher"
              isAuthorized
            />
          ))
        ) : (
          <NoDataAvailable />
        )}
      </div>
      <hr className={styles.hr} />
      <Pagination
        baseUrl="/dashboard/manage/student-information"
        currentPage={+page}
        size={size}
        totalPages={data?.totalPages}
      />
    </div>
  );
}
