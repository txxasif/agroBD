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
      {userData ? (
        <div className="flex relative">
          {/* Fixed Sidebar */}
          <div className="flex-col w-1/3 sticky left-2 mt-4 h-screen space-y-2 z-10">
            <AboutSection className="w-full" />
            <CreatePost />
          </div>

          {/* Content Area */}
          <div className="w-full ">
            <Tabs defaultValue="posts">
              <TabsList className="w-fit flex mx-auto">
                <TabsTrigger className="px-4 py-2 rounded-sm" value="posts">Posts</TabsTrigger>
                <TabsTrigger className="px-4 py-2 rounded-sm" value="setting">Setting</TabsTrigger>
              </TabsList>
              <TabsContent value="posts">
                <Posts className="mx-auto w-full" />
              </TabsContent>
              <TabsContent className="w-full" value="setting">
                <UserSetting />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      ) : 'Please Login'}
    </>
  );
}
