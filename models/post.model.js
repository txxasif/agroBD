import mongoose from "mongoose";
import Product from "./post.schema";
import User from "./user.schema";
import connectDB from "./mongoose";
import translateToBangla from "@/helper/translation";
const itemsPerPage = 10;

export async function createPostModel(postData) {
  // const priceBn = await translateToBangla(postData.price);
  // const quantityBn = await translateToBangla(postData.quantity);
  // const newPostData = { ...postData, priceBn: priceBn, quantityBn: quantityBn };
  const newPost = new Product({ ...postData });
  const result = await newPost.save();
  if (result) {
    return true;
  } else {
    return false;
  }
}
export async function getProductDataModel1(id) {
  const nId = new mongoose.Types.ObjectId(id);
  const result1 = await Product.aggregate([
    {
      $match: { _id: nId },
    },
    {
      $lookup: {
        from: "users",
        localField: "seller",
        foreignField: "_id",
        as: "sellerDetails",
      },
    },
    {
      $unwind: "$sellerDetails",
    },
    {
      $project: {
        _id: 0,
        userDetails: {
          name: "$sellerDetails.name",
          photo: "$sellerDetails.photo",
          _id: "$sellerDetails._id",
        },
        productDetails: {
          $mergeObjects: ["$$ROOT"],
        },
      },
    },
    {
      $unset: "productDetails.sellerDetails",
    },
  ]);
  return result1;
}
export async function getProductDataModel(id) {
  let status = false;
  let result;
  try {
    result = await Product.findById(id).exec();
    if (result) {
      status = true;
    }
  } catch (err) {
    console.log(err);
  }
  return {
    status: status,
    data: result,
  };
}
export async function getUserPostsModel(id) {
  try {
    const userData = await User.findById(id).select("name photo email _id");
    const userProducts = await Product.find({ seller: id }).sort({
      createdAt: -1,
    });
    const data = {
      user: userData,
      posts: userProducts,
    };

    return { status: true, data };
  } catch (err) {
    console.log(err);
    return { status: false };
  }
}
export async function fakeSearch(query) {
  const res = await Product.find({ ...query }).countDocuments();
  console.log(res, "query");
}
export async function getAllPostsModel(query, page) {
  // Set the desired number of items per page

  // Calculate the total number of posts
  const totalItems = await Product.find({ ...query }).countDocuments();
  console.log(totalItems);

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calculate the pagination values for the given page
  const limit = itemsPerPage;
  const skip = Math.max(0, (page - 1) * itemsPerPage);
  console.log(skip);

  // Fetch the posts for the given page
  const result = await Product.find({ ...query })
    .select("-updatedAt")
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip);

  // Get the list of seller IDs from the fetched posts
  const sellerIds = result.map((post) => post.seller);

  // Fetch the seller data for each post using the IDs
  const sellerData = await User.find({ _id: { $in: sellerIds } }).select(
    "name photo _id"
  );
  // Create a map of seller data using the seller IDs
  const sellerDataMap = sellerData.reduce((map, seller) => {
    map[seller._id] = seller;
    return map;
  }, {});
  // Populate the seller data for each post
  const postPopulate = result.map((post) => {
    const sellerId = post.seller.toString();
    const seller = sellerDataMap[sellerId];
    return { ...post.toObject(), sellerData: seller };
  });

  return { postPopulate, totalPages };
}
export async function deleteUserPost(id) {
  try {
    await Product.deleteOne({ _id: id });
    return true;
  } catch (err) {
    return false;
  }
}
export async function setProductLocation() {
  await connectDB();
  const data = await Product.aggregate()
    .lookup({
      from: "users",
      localField: "seller",
      foreignField: "_id",
      as: "sellerDetails",
    })
    .unwind({
      path: "$sellerDetails",
      preserveNullAndEmptyArrays: true,
    })
    .project({
      sellerLocationBn: "$sellerDetails.locationBn",
      sellerLocation: "$sellerDetails.location",
    });
  const bulkUpdateOperations = data.map(async (doc) => {
    const nId = new mongoose.Types.ObjectId(doc._id);
    const res = Product.updateOne(
      { _id: nId },
      {
        $set: {
          sellerLocation: doc.sellerLocation,
          sellerLocationBn: doc.sellerLocationBn,
        },
      }
    );
  });
  await Promise.all(bulkUpdateOperations);

  //const r = await Product.bulkWrite(bulkUpdateOperations);
  //console.log(r);

  return data;
}
