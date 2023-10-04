import Pagination from "@/components/pagiNation/pagiNation";
import PostCard from "@/components/postCard/postCard";
import axios from "axios";
//import { useQuery } from "react-query";
export default async function Page({ searchParams }) {
  const page = searchParams.page || 1;
  // const data = await axios
  //   .get(`/api/home?page=${page}`)
  //   .then((res) => res.data.data);
  const data = await fetch(`http://localhost:3000/api/home?page=${page}`)
    .then((res) => res.json())
    .then((res) => res.data);

  // const { data, isLoading } = useQuery({
  //   queryFn: fetchData,
  //   queryKey: ["home"],
  // });

  console.log(data);
  return (
    <div className="h-screen flex flex-col">
      <div className="">
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
// export async function getServerSideProps(context){
//   const fetcher = async (url) => await axios.get(url).then((res) => res.data.data);
//   const SERVER_URL = process.env.NODE_ENV === "production" ? "https://your-production-server.com" : "http://localhost:3000";
//   const response =  await axios.get(`${SERVER_URL}/api/post`);

//   console.log(data,'xbb');

//  //                                                                                                                                                                                    console.log(data.data,'home');
//   return({
//     props: {
//       userPost: data
//     }
//   })
// }
