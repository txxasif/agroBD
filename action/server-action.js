"use server";

import Product from "@/models/post.schema";

export async function deletePost(form) {
  const id = form.get("id");
  const re = await Product.deleteOne({ _id: id });

  console.log("deleted post");
}
