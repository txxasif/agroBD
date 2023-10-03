'use client'
import { useEffect, useState } from "react";
import PostCard from "../postCard/postCard"
import { useSession } from "next-auth/react";
export default function Posts(props) {
  const [data, setData] = useState(null);
  const { data: session } = useSession();
  const user = session.user;
  const seller = {
    name: user?.name,
    photo: user?.photo
  }
  useEffect(() => {
    let getData = async () => {

      let response = await fetch(`/api/profile/${user._id}`);
      let dataPost = await response.json();
      console.log(response, 'hiiP');
      console.log(dataPost.data.posts);
      setData(dataPost.data);


    }

    getData();
  }, [])


  return (

    <div className="mt-1" {...props}>

      {
        data && data.posts.map((post) => (<PostCard key={post._id} post={post} seller={seller} />))
      }
    </div>
  )
}