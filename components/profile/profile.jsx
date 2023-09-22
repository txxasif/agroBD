'use client'
import {
  currentUserSelector,
  currentUserDataSelector,
} from "@/store/reducers/user.selector";
import styles from './profile.module.css';
import { useSelector } from "react-redux";
import AboutSection from "../aboutSection/aboutSection";
import CreatePost from "../createPost/createPost";
import Posts from "../userPosts/userPosts";
export default function Profile() {
  const userData = useSelector(currentUserDataSelector);
  return (
    <div>
      {
        userData ? (
          <div>
            <div className="flex">
              <AboutSection user={userData} />
              <CreatePost />
            </div>
            <div className={styles.container}>
              <div className={styles.container2}>
                <Posts user={userData} />
              </div>

            </div>
          </div>
        ) : 'Please Login'
      }
    </div>
  );
}
