"use client";

import { sidebarData } from "@/data/sidebar-data";
import styles from "@/styles/components/common/sidebar-links.module.scss";
import { filterAndSortDataByTitle } from "@/utils/functions/filter-and-sort-data-by-title";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarLinks({ role }) {
  const pathname = usePathname();
  const sortedData = filterAndSortDataByTitle(sidebarData, role);

  return (
    sortedData &&
    sortedData.map((item) => (
      <Link
        key={item._id}
        href={item.pathname}
        title={item.title}
        className={`${styles.linkItem} ${
          pathname === item.pathname ? styles.activeLink : ""
        }`}
      >
        <span>{item.icon}</span>
        <span>{item.title}</span>
      </Link>
    ))
  );
}
