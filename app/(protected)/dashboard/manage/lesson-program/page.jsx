import { ListSkeleton } from "@/components/common/ListSkeleton";
import PageTitle from "@/components/common/PageTitle";
import PlusLink from "@/components/common/PlusLink";
import LessonProgramList from "@/components/list/LessonProgramList";
import styles from "@/styles/page.module.scss";
import { Suspense } from "react";
import { MdOutlineViewTimeline } from "react-icons/md";

export default async function LessonProgramManagementPage(props) {
  const searchParameters = await props.searchParams;
  let { size, page, sort, type } = searchParameters;

  size = size || 6;
  page = page || 1;
  sort = sort || "day";
  type = type || "asc";

  return (
    <>
      <div className={styles.addContainer}>
        <PlusLink
          href="/dashboard/manage/lesson-program/new"
          title="Create new LessonProgram"
        >
          <MdOutlineViewTimeline />
        </PlusLink>
      </div>
      <PageTitle title="LessonPrograms" />
      <div className={styles.container}>
        <Suspense fallback={<ListSkeleton />}>
          <LessonProgramList size={size} page={page} sort={sort} type={type} />
        </Suspense>
      </div>
    </>
  );
}
