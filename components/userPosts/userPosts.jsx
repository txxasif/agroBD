"use client";
import { useEffect, useState } from "react";
import PostCard from "../postCard/postCard";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import OwnerCard from "../productCardOwner/ownerCard";
export default function Posts({ user }) {
  const seller = {
    name: user.name,
    photo: user.photo,
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: async () =>
      await axios
        .get(`/api/profile/${user._id}`)
        .then((res) => res.data.data.posts),
  });

  return (
    <div className="flex flex-wrap gap-2 py-3 px-5">
      {data &&
        data.map((post) => (
          <OwnerCard key={post._id} post={post} seller={seller} />
        ))}
    </div>
  );
}
