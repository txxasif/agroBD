"use client"
import { useRouter } from 'next/navigation';
import styles from './page.module.css';


const Pagination = ({ totalPages, currentPage }) => {
  const router = useRouter();
  const handleClick = (pageNo) => {


    router.push(`/?page=${pageNo}`);
  }

  return (
    <div className={styles.pagination}>
      <ul className={styles['pagination-list']}>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <li key={page}>
            <a
              className={page === currentPage ? styles.active : ''}
              onClick={() => handleClick(page)}
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
