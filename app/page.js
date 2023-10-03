import Pagination from "@/components/pagiNation/pagiNation";
import PostCard from "@/components/postCard/postCard";
import axios from "axios";
export default async function Page({ searchParams }) {
  const page = searchParams.page || 1;
  const data = await axios
    .get(`http://localhost:3000/api/home?page=${page}`)
    .then((res) => res.data.data);
  if (!data) {
    return <h1>loading</h1>;
  }
  console.log(data);
  return (
    <div className="h-screen">
      <div>
        {data.postPopulate.map((user) => {
          return (
            <PostCard key={user._id} seller={user.sellerData} post={user} />
          );
        })}
      </div>
      <Pagination totalPages={data.totalPages} currentPage={page} />
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
