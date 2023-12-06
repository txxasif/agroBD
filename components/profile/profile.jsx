"use client";
import AboutSection from "../aboutSection/aboutSection";
import CreatePost from "../createPost/createPost";
import Posts from "../userPosts/userPosts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserSetting } from "../userSetting/usersetting";

export default function Profile() {
  return (
    <div className="flex flex-col ">
      {/* Fixed Sidebar */}
      <div className="flex flex-col gap-y-2 md:flex-row   gap-x-9 w-full items-center justify-center">
        <AboutSection className="w-w-lg shadow-lg " />
        <CreatePost className="max-w-lg shadow-lg" />
      </div>

      {/* Content Area */}
      <div className="w-full mt-4">
        <Posts className="w-full flex items-center justify-center" />
      </div>
    </div>
  );
}
