"use client";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import Link from "next/link";
import { useCallback } from "react";

const Pagination = ({ totalPages, currentPage }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  return (
    <div className="my-5">
      <ul className={styles["pagination-list"]}>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <li key={page}>
              <Link
                className={page === currentPage ? styles.active : ""}
                href={`?${createQueryString("page", page)}`}
              >
                {page}
              </Link>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default Pagination;
