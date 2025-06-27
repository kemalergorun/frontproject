import styles from "@/styles/list.module.scss";
import NoDataAvailable from "../common/NoDataAvailable";
import MeetingCard from "../cards/MeetingCard";
import Pagination from "../common/Pagination";
import { calculateOrderNumber } from "@/utils/functions/calculate-order-number";
import { getMeetingsByPage } from "@/actions/meeting/get-meetings-by-page.action";
import { deleteMeeting } from "@/actions/message/delete-meeting.action";

export default async function MeetingListForTeacher({
  page,
  size,
  sort,
  type,
}) {
  const data = await getMeetingsByPage({
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
            <MeetingCard
              key={index}
              data={item}
              orderNumber={calculateOrderNumber(page, size, index)}
              isEditButton
              deleteAction={deleteMeeting}
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
        baseUrl="/dashboard/manage/meeting"
        currentPage={+page}
        size={size}
        totalPages={data?.totalPages}
      />
    </div>
  );
}
