'use client'
import AboutSection from "../aboutSection/aboutSection";
import CreatePost from "../createPost/createPost";
import Posts from "../userPosts/userPosts";
import { useSession } from "next-auth/react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { UserSetting } from "../userSetting/usersetting";
export default function Profile() {
  const { data } = useSession()
  const userData = data?.user;
  return (
    <>
      {
        userData ? (
          <>
            <div className="grid md:grid-cols-8 gap-3">
              <AboutSection className="w-fit col-start-2 col-end-4  mx-auto" />
              <CreatePost className="col-span-3" />
            </div>
            <Tabs defaultValue="posts" className="w-full my-3">
              <TabsList className="w-fit flex mx-auto">
                <TabsTrigger className="px-4 py-2 rounded-sm" value="posts">Posts</TabsTrigger>
                <TabsTrigger className="px-4 py-2 rounded-sm" value="setting">Setting</TabsTrigger>
              </TabsList>
              <TabsContent value="posts">
                <Posts className="w-full mx-auto" />
              </TabsContent>
              <TabsContent className="w-full " value="setting">
                <UserSetting />
              </TabsContent>
            </Tabs>

          </>
        ) : 'Please Login'
      }
    </>
  );
}




