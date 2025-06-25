import { ListSkeleton } from "@/components/common/ListSkeleton";
import PageTitle from "@/components/common/PageTitle";
import PlusLink from "@/components/common/PlusLink";
import ManagerList from "@/components/list/ManagerList";
import styles from "@/styles/page.module.scss";
import { Suspense } from "react";
import { MdAssistant } from "react-icons/md";

export default async function AssistantManagerManagementPage(props) {
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
          href="/dashboard/manage/manager/new"
          title="Create new Manager"
        >
          <MdAssistant />
        </PlusLink>
      </div>
      <PageTitle title="Managers (Deans)" />
      <div className={styles.container}>
        <Suspense fallback={<ListSkeleton />}>
          <ManagerList size={size} page={page} sort={sort} type={type} />
        </Suspense>
      </div>
    </>
  );
}
