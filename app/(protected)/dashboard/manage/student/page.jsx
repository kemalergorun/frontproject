import { ListSkeleton } from "@/components/common/ListSkeleton";
import PageTitle from "@/components/common/PageTitle";
import PlusLink from "@/components/common/PlusLink";
import StudentList from "@/components/list/StudentList";
import styles from "@/styles/page.module.scss";
import { Suspense } from "react";
import { PiStudentFill } from "react-icons/pi";

export default async function StudentManagementPage(props) {
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
          href="/dashboard/manage/student/new"
          title="Students"
        >
          <PiStudentFill />
        </PlusLink>
      </div>
      <PageTitle title="Students" />
      <div className={styles.container}>
        <Suspense fallback={<ListSkeleton />}>
          <StudentList size={size} page={page} sort={sort} type={type} />
        </Suspense>
      </div>
    </>
  );
}
