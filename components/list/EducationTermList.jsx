import styles from "@/styles/list.module.scss";
import NoDataAvailable from "../common/NoDataAvailable";
import EducationTermCard from "../cards/EducationTermCard";
import Pagination from "../common/Pagination";
import { calculateOrderNumber } from "@/utils/functions/calculate-order-number";
import { getEducationTermsByPage } from "@/actions/education-term/get-education-terms-by-page.action";

export default async function EducationTermList({ page, size, sort, type }) {
  const data = await getEducationTermsByPage({
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
            <EducationTermCard
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
        baseUrl="/dashboard/manage/education-term"
        currentPage={+page}
        size={size}
        totalPages={data?.totalPages}
      />
    </div>
  );
}
