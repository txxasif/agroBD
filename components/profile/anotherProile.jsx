import User from "@/models/user.schema";
import AboutSection from "../aboutSection/aboutSection";
import AnotherUserPosts from "../otherProfileCard/otherprofile";
import connectDB from "@/models/mongoose";
export default async function AnotherProfile({ uId }) {
  await connectDB();
  const user = await User.findOne({ _id: uId });
  console.log(user);
  return (
    <div className="flex flex-col justify-center items-center">
      <AboutSection user={user} className="w-fit" />
      <AnotherUserPosts uId={uId} />
    </div>
  );
}
