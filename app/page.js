import Pagination from "../components/pagiNation/pagiNation";
import PostCard from "../components/postCard/postCard";

export default async function Page({ searchParams }) {
  const page = searchParams.page || 1;
  const data = await fetch(
    `${process.env.NEXTAUTH_URL}/api/home?page=${page}`,
    {
      next: { revalidate: 10 },
    }
  )
    .then((res) => res.json())
    .then((res) => res.data);

  // const { data, isLoading } = useQuery({
  //   queryFn: fetchData,
  //   queryKey: ["home"],
  // });

  console.log(data);
  return (
    <div className="h-screen  px-4 ">
      <div className="flex flex-wrap gap-5 ">
        {data?.postPopulate.map((user) => {
          return (
            <PostCard key={user._id} seller={user.sellerData} post={user} />
          );
        })}
      </div>
      <Pagination totalPages={data?.totalPages} currentPage={page} />
    </div>
  );
}
