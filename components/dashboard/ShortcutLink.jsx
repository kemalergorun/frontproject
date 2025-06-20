import { sidebarData } from "@/data/sidebar-data";
import styles from "@/styles/components/dashboard/shortcut-link.module.scss";
import { filterAndSortDataByTitle } from "@/utils/functions/filter-and-sort-data-by-title";
import PlusLink from "../common/PlusLink";

export default function ShortcutLink({ role, isStudent }) {
  const sortedData = filterAndSortDataByTitle(
    sidebarData,
    isStudent ? "" : role
  );

  const filteredData = sortedData.filter((item) => {
    return (
      item.pathname !== "/dashboard/manage/message" &&
      item.pathname !== "dashboard"
    );
  });

  return (
    <div className={styles.container}>
      {filteredData.map((item, index) => (
        <PlusLink key={index} href={`${item.pathname}/new`} title={item.title}>
          {item.icon}
        </PlusLink>
      ))}
    </div>
  );
}
