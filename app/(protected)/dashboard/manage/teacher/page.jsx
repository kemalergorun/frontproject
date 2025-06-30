import { ListSkeleton } from "@/components/common/ListSkeleton";
import PageTitle from "@/components/common/PageTitle";
import PlusLink from "@/components/common/PlusLink";
import TeacherList from "@/components/list/TeacherList";
import styles from "@/styles/page.module.scss";
import { Suspense } from "react";
import { FaChalkboardTeacher } from "react-icons/fa";

export default async function TeacherManagementPage(props) {
  const searchParameters = await props.searchParams;
  let { size, page, sort, type } = searchParameters;

  size = size || 6;
  page = page || 1;
  sort = sort || "name";
  type = type || "desc";

  return (
    <>
      <div className={styles.addContainer}>
        <PlusLink
          href="/dashboard/manage/teacher/new"
          title="Teachers"
        >
          <FaChalkboardTeacher />
        </PlusLink>
      </div>
      <PageTitle title="Teachers" />
      <div className={styles.container}>
        <Suspense fallback={<ListSkeleton />}>
          <TeacherList size={size} page={page} sort={sort} type={type} />
        </Suspense>
      </div>
    </>
  );
}
