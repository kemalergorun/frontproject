import styles from "@/styles/list.module.scss";
import NoDataAvailable from "../common/NoDataAvailable";
import AdminCard from "../cards/AdminCard";
import Pagination from "../common/Pagination";
import { calculateOrderNumber } from "@/utils/functions/calculate-order-number";
import { getManagerByPage } from "@/actions/manager/get-manager-by-page.action";
import { deleteManager } from "@/actions/manager/delete-manager.action";

export default async function ManagerList({ page, size, sort, type }) {
  const data = await getManagerByPage({
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
              deleteAction={deleteManager}
              type="manager"
            />
          ))
        ) : (
          <NoDataAvailable />
        )}
      </div>
      <hr className={styles.hr} />
      <Pagination
        baseUrl="/dashboard/manage/manager"
        currentPage={+page}
        size={size}
        totalPages={data?.totalPages}
      />
    </div>
  );
}
