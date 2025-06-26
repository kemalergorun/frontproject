import styles from "@/styles/list.module.scss";
import NoDataAvailable from "../common/NoDataAvailable";
import MessageCard from "../cards/MessageCard";
import Pagination from "../common/Pagination";
import { calculateOrderNumber } from "@/utils/functions/calculate-order-number";
import { getMessagesByPage } from "@/actions/message/get-messages-by-page.action";

export default async function MessageList({ page, size, sort, type }) {
  const data = await getMessagesByPage({ page: page - 1, size, sort, type });

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
            <MessageCard
              key={index}
              data={item}
              orderNumber={calculateOrderNumber(page, size, index)}
            />
          ))
        ) : (
          <NoDataAvailable />
        )}
      </div>
      <hr className={styles.hr} />
      <Pagination
        baseUrl="/dashboard/manage/message"
        currentPage={+page}
        size={size}
        totalPages={data?.totalPages}
      />
    </div>
  );
}
