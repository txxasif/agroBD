import Search from "@/components/search/serach";
import Pagination from "../components/pagiNation/pagiNation";
import PostCard from "../components/postCard/postCard";

export default async function Page({ searchParams }) {
  const page = searchParams.page || 1;
  const division = searchParams.division || "";
  const district = searchParams.district || "";
  const upazilla = searchParams.upazilla || "";
  const category = searchParams.category || "";
  const data = await fetch(
    `${process.env.NEXTAUTH_URL}/api/home?page=${page}&category=${category}&upazilla=${upazilla}&division=${division}&district=${district}`,
    {
      cache: "no-cache",
    }
  )
    .then((res) => res.json())
    .then((res) => res.data);

  console.log(data);
  return (
    <div className="h-screen  px-4 ">
      <Search />
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
