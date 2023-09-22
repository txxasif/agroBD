'use client'
import { useEffect, useState } from "react";
import PostCard from "../postCard/postCard"
export default function Posts({ user }) {
  const [data, setData] = useState(null);
  console.log(user, 'userpos');
  const seller = {
    name: user.name,
    photo: user.photo
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

    <div>
      <h1>{`posts of ${user.name}`}</h1>
      {
        data && data.posts.map((post) => (<PostCard key={post._id} post={post} seller={seller} />))
      }
    </div>
  )
}