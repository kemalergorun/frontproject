import { ListSkeleton } from "@/components/common/ListSkeleton";
import PageTitle from "@/components/common/PageTitle";
import PlusLink from "@/components/common/PlusLink";
import StudentInformationList from "@/components/list/StudentInformationList";
import styles from "@/styles/page.module.scss";
import { Suspense } from "react";
import { GiNotebook } from "react-icons/gi";

export default async function StudentInformationManagementPage(props) {
  const searchParameters = await props.searchParams;
  let { size, page, sort, type } = searchParameters;

  size = size || 6;
  page = page || 1;
  // sort = sort || "name";
  // type = type || "desc";

  return (
    <>
      <div className={styles.addContainer}>
        <PlusLink
          href="/dashboard/manage/student-information/new"
          title="Create new Student Information"
        >
          <GiNotebook />
        </PlusLink>
      </div>
      <PageTitle title="Student Information" />
      <div className={styles.container}>
        <Suspense fallback={<ListSkeleton />}>
          <StudentInformationList
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
