"use client";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import Link from "next/link";
import { useCallback } from "react";
import {
  Pagination as Page,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Pagination = ({ totalPages, currentPage }) => {
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
    <div className="fixed bottom-2 left-[50%]">
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
// const Pagination = ({ totalPages, currentPage }) => {
//   const searchParams = useSearchParams();
//   const page = searchParams.get("page") || 1;
//   const isActive = page === currentPage;
//   console.log(page, currentPage);

//   const createQueryString = useCallback(
//     (name, value) => {
//       const params = new URLSearchParams(searchParams);
//       params.set(name, value);

//       return params.toString();
//     },
//     [searchParams]
//   );
//   const createPreviousQueryString = useCallback(
//     (name, value) => {
//       if (value === 1) return "#";
//       const params = new URLSearchParams(searchParams);
//       params.set(name, value - 1);

//       return params.toString();
//     },
//     [searchParams]
//   );
//   const createNextQueryString = useCallback(
//     (name, value) => {
//       if (value === totalPages) return "#";
//       const params = new URLSearchParams(searchParams);
//       params.set(name, value + 1);

//       return params.toString();
//     },
//     [searchParams]
//   );

//   return (
//     <Page>
//       <PaginationContent>
//         <PaginationItem>
//           <PaginationPrevious
//             href={`?${createPreviousQueryString("page", page)}`}
//           />
//         </PaginationItem>
//         {Array.from({ length: totalPages }, (_, index) => index + 1).map(
//           (page) => (
//             <PaginationItem key={page}>
//               <PaginationLink
//                 isActive={isActive}
//                 href={`?${createQueryString("page", page)}`}
//               >
//                 {page}
//               </PaginationLink>
//             </PaginationItem>
//           )
//         )}
//         <PaginationItem>
//           <PaginationEllipsis />
//         </PaginationItem>
//         <PaginationItem>
//           <PaginationNext href="#" />
//         </PaginationItem>
//       </PaginationContent>
//     </Page>
//   );
// };

export default Pagination;
