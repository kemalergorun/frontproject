import { ListSkeleton } from "@/components/common/ListSkeleton";
import PageTitle from "@/components/common/PageTitle";
import PlusLink from "@/components/common/PlusLink";
import EducationTermList from "@/components/list/EducationTermList";
import styles from "@/styles/page.module.scss";
import { Suspense } from "react";
import { AiOutlineSchedule } from "react-icons/ai";

export default async function EducationTermManagementPage(props) {
  const searchParameters = await props.searchParams;
  let { size, page, sort, type } = searchParameters;

  size = size || 6;
  page = page || 1;
  sort = sort || "startDate";
  type = type || "desc";

  return (
    <>
      <div className={styles.addContainer}>
        <PlusLink
          href="/dashboard/manage/education-term/new"
          title="Create new Education Term"
        >
          <AiOutlineSchedule />
        </PlusLink>
      </div>
      <PageTitle title="Admins" />
      <div className={styles.container}>
        <Suspense fallback={<ListSkeleton />}>
          <EducationTermList size={size} page={page} sort={sort} type={type} />
        </Suspense>
      </div>
    </>
  );
}
