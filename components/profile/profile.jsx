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
import { useSession } from "next-auth/react";
export default function Profile() {
  const { data } = useSession()
  const userData = data?.user;
  return (
    <>
      {
        userData ? (
          <div className="grid md:grid-cols-8 gap-3">
            <AboutSection className="w-fit col-start-2 col-end-4  mx-auto" />
            <CreatePost className="col-span-3" />
            <Posts className="row-start-2" />
          </div>
        ) : 'Please Login'
      }
    </>
  );
}
