"use client"
import React from 'react';
import styles from './post.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
const PostCard = ({ seller, post }) => {
  const router = useRouter();
  const buy = () => {
    router.push(`/product/${post._id}`)
  }

  const { description, category, price, quantity, unit, photo, createdAt } = post;
  const date = new Date(createdAt).toLocaleString();
  const loader = () => photo;

  return (
    <div className="card w-96  shadow-xl ">
      <figure>
        <Image src={photo} width='500' height='500' alt="" />
      </figure>
      <div className="card-body ">
        <div className="px-3">
          <p>{description}</p>
        </div>
        <div className={styles.productDetailsContainer}>
          <p> <Image src={'/icons/category.png'} width={10} height={10} /> {category}</p>
          <p>Price : {price}$</p>
          <p>Unit: {unit}</p>
          <p>Available: {quantity}</p>

        </div>
        <div onClick={buy} className={styles.button}>
          Buy Now
        </div>
      </div>
    </div>

  );
};

export default PostCard;


// return (
//   <div className="card w-96 bg-base-100 shadow-xl">
//     <div className={styles.topContainer}>
//       <div class={styles.photoContainer}>
//         <Image width='48' height='48' loader={loader2} className={styles.photo} src="./44.jpg" alt="" />
//       </div>
//       <div className={styles.infoContainer}>
//         <h3>{seller?.name || 'Sabbir'}</h3>
//         <p>{date}</p>
//       </div>
//     </div>
//     <div className={styles.postPhoto}>
//       <Image src={photo} width='230' height='230' loader={loader} alt="" className={styles.pPhoto} />
//     </div>
//     <div className={styles.postDetails}>
//       <h4>{title}</h4>
//       <h2>{description}</h2>
//     </div>
//     <div className={styles.productDetailsContainer}>
//       <p>Category: {category}</p>
//       <p>Price : {price}$</p>
//       <p>Unit: {unit}</p>
//       <p>Available: {quantity}</p>

//     </div>
//     <div onClick={buy} className={styles.button}>
//       Buy Now
//     </div>
//   </div>

// );
// };