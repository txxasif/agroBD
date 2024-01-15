import PostCard from "../postCard/postCard";

export default async function AnotherUserPosts({ uId }) {
  const data = await fetch(`${process.env.NEXTAUTH_URL}/api/profile/${uId}`)
    .then((res) => res.json())
    .then((res) => res.data.posts);
  return (
    <div className="w-full flex justify-items-stretch">
      {data.map((post, idx) => (
        <PostCard key={idx} post={post} />
      ))}
    </div>
  );
}
