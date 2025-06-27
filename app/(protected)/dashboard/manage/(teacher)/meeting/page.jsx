import { ListSkeleton } from "@/components/common/ListSkeleton";
import PageTitle from "@/components/common/PageTitle";
import PlusLink from "@/components/common/PlusLink";
import MeetingListForTeacher from "@/components/list/MeetingListForTeacher";
import styles from "@/styles/page.module.scss";
import { Suspense } from "react";
import { FaPeopleLine } from "react-icons/fa6";

export default async function MeetingManagementPage(props) {
  const searchParameters = await props.searchParams;
  let { size, page, sort, type } = searchParameters;

  size = size || 6;
  page = page || 1;
  sort = sort || "date";
  type = type || "desc";

  return (
    <>
      <div className={styles.addContainer}>
        <PlusLink
          href="/dashboard/manage/meeting/new"
          title="Create new Meeting"
        >
          <FaPeopleLine />
        </PlusLink>
      </div>
      <PageTitle title="Meetings" />
      <div className={styles.container}>
        <Suspense fallback={<ListSkeleton />}>
          <MeetingListForTeacher
            size={size}
            page={page}
            sort={sort}
            type={type}
          />
        </Suspense>
      </div>
    </>
  );
}
