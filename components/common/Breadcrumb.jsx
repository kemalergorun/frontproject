"use client";

import styles from "@/styles/components/common/breadcrumb.module.scss";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";

export default function Breadcrumb() {
  const segments = useSelectedLayoutSegments();

  const breadcrumbItems = segments.reduce((acc, segment, index, arr) => {
    if (
      (segment.startsWith("(") && segment.endsWith(")")) ||
      segment === "manage"
    ) {
      return acc;
    }

    const displaySegment = segment.replace(/-/g, " ");

    const pathSegments = arr.slice(0, index + 1);

    let path = "";

    for (let i = 0; i < pathSegments.length; i++) {
      if (!pathSegments[i].startsWith("(") && !pathSegments[i].endsWith(")")) {
        path += `/${pathSegments[i]}`;
      } else {
        path += `/${pathSegments[i].slice(1, -1)}`;
      }
    }

    acc.push(
      <li key={index} className={styles.breadcrumbItem}>
        <Link
          href={path}
          className={styles.breadcrumbLink}
          title={`Go to ${displaySegment}`}
        >
          {displaySegment}
        </Link>
      </li>
    );

    return acc;
  }, []);

  return (
    <nav>
      <ul className={styles.breadcrumbList}>{breadcrumbItems}</ul>
    </nav>
  );
}
