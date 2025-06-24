import { ListSkeleton } from "@/components/common/ListSkeleton";
import PageTitle from "@/components/common/PageTitle";
import PlusLink from "@/components/common/PlusLink";
import AssistantManagerList from "@/components/list/AssistantManagerList";
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
          href="/dashboard/manage/assistant-manager/new"
          title="Create new Assistant Manager"
        >
          <MdAssistant />
        </PlusLink>
      </div>
      <PageTitle title="Assistant Managers (Vice Deans)" />
      <div className={styles.container}>
        <Suspense fallback={<ListSkeleton />}>
          <AssistantManagerList
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
