"use client";
import AboutSection from "../aboutSection/aboutSection";
import CreatePost from "../createPost/createPost";
import Posts from "../userPosts/userPosts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserSetting } from "../userSetting/usersetting";

export default function Profile() {
  return (
    <div className="flex flex-col">
      {/* Fixed Sidebar */}
      <div className="flex flex-col gap-y-2 md:flex-row   gap-x-9 w-full items-center justify-center">
        <AboutSection className="w-w-lg shadow-lg " />
        <CreatePost className="max-w-lg" />
      </div>

      {/* Content Area */}
      <div className="w-full mt-4">
        <Tabs defaultValue="posts">
          <TabsList className="w-fit flex mx-auto">
            <TabsTrigger className="px-4 py-2 rounded-sm" value="posts">
              Posts
            </TabsTrigger>
            <TabsTrigger className="px-4 py-2 rounded-sm" value="setting">
              Setting
            </TabsTrigger>
          </TabsList>
          <TabsContent value="posts">
            <Posts className="w-full flex items-center justify-center" />
          </TabsContent>
          <TabsContent className="w-full" value="setting">
            <UserSetting />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
