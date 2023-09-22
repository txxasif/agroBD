'use client'
import React, { use } from 'react';
import styles from './aboutSection.module.css';
import Image from 'next/image';
const ImageLoader = (link) => {
  return link
}
export default function AboutSection({ user }) {
  const loader = () => user.photo;
  console.log(user, 'about');
  return (
    <div className={styles.profileCard}>
      <div className={styles.profilePhotoContainer}>
        <Image
          className={styles.profilePhoto}
          loader={loader}
          src={user?.photo}
          width={500}
          height={600}
          alt='photo' />
      </div>
      <div className={styles.profileInfo}>
        <h2>Name: {user?.name || 'Amzad Hosen'}</h2>
        <h2>Email: {user?.email}</h2>
        <h2>Phone: {user?.phone || '01679806197'}</h2>
        <h2>Role : {user?.role || 'Farmer'}</h2>
      </div>
    </div>
  );
}
// (
//   <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
//       <div className="flex flex-col items-center pb-10">
//         <img
//           className="w-24 h-24 mb-3 rounded-full shadow-lg"
//           src={user.photo}
//           alt="Bonnie image"
//         />
//         <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
//           {user.name}
//         </h5>
//         <span className="text-sm text-gray-500 dark:text-gray-400">
//           {user?.email}
//         </span>
//         <span className="text-sm text-gray-500 dark:text-gray-400">
//           {user?.phoneNumber}
//         </span>
//       </div>
//     </div>
// )