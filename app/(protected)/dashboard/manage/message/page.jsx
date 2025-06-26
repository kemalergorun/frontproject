import { ListSkeleton } from "@/components/common/ListSkeleton";
import PageTitle from "@/components/common/PageTitle";
import MessageList from "@/components/list/MessageList";
import styles from "@/styles/page.module.scss";
import { Suspense } from "react";

export default async function MessageManagementPage(props) {
  const searchParameters = await props.searchParams;
  let { size, page, sort, type } = searchParameters;

  size = size || 10;
  page = page || 1;
  sort = sort || "name";
  type = type || "desc";

  return (
    <>
      <PageTitle title="Contact Message" />
      <div className={styles.container}>
        <Suspense fallback={<ListSkeleton height="110px" flex="1 1 500px" />}>
          <MessageList size={size} page={page} sort={sort} type={type} />
        </Suspense>
      </div>
    </>
  );
}
