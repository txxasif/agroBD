'use client'
import { useEffect, useState } from "react";
import PostCard from "../postCard/postCard"
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";
import axios from "axios";
export default function Posts(props) {
  const { data: session } = useSession();
  const user = session.user;
  const seller = {
    name: user?.name,
    photo: user?.photo
  }
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: async () => await axios.get(`/api/profile/${user._id}`).then(res => res.data.data.posts),
  })
  //console.log(data?.data.posts);
  // useEffect(() => {
  //   let getData = async () => {

  //     let response = await fetch(`/api/profile/${user._id}`);
  //     let dataPost = await response.json();
  //     console.log(response, 'hiiP');
  //     console.log(dataPost.data.posts);
  //     setData(dataPost.data);


  //   }

  //   getData();
  // }, [])


  return (

    <div className="flex flex-wrap gap-2 py-3 px-5">

      {
        data && data.map((post) => (<PostCard key={post._id} post={post} seller={seller} />))
      }
    </div>
  )
}