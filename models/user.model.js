import User from "./user.schema";
import Post from "./post.schema";
import mongoose from "mongoose";
export async function createUser(user) {
  let status = null;
  let data = null;
  const { email } = user;
  const check = await User.findOne({ email });
  console.log(check, "hii");
  if (!check) {
    try {
      const newUser = new User({ ...user });
      data = await newUser.save();
      status = true;
    } catch (err) {
      console.log(err);
    }
  } else {
    status = false;
  }
  return { status: status, data: data };
}
export async function getUserNameAndPhoto(id) {
  const data = await User.findOne({ _id: id }).select("name photo");
  return data;
}
export async function checkLogin(user) {
  let status = null;
  let data = null;
  try {
    const response = await User.findOne({ ...user }).select("-password");

    if (response) {
      console.log(response);
      status = true;
      data = response;
    } else {
      status = false;
    }
  } catch (err) {
    console.log(err);
  }

  return { status: status, data: data };
}
export async function addToCart(order) {
  let status = false;
  console.log(status);
  try {
    const result = await User.updateOne(
      {
        _id: order.uid,
      },
      {
        $push: {
          cart: {
            productId: order.productId,
            quantity: Number(order.quantity),
            deliveryAddress: order.address,
          },
        },
      },
      {
        upsert: true,
      }
    );
    const result1 = Post.updateOne(
      {
        _id: order.id,
      },
      {
        $push: {
          orders: {
            customer: order.uid,
            quantity: Number(order.quantity),
            deliveryAddress: order.address,
          },
        },
      }
    );
    console.log(result1, "res");
    if (result.acknowledged && result1.acknowledged) {
      status = true;
    }
  } catch (err) {
    console.log(err);
  }
  return status;
}
export async function getUserSettings(id) {
  const data = await User.findOne({ _id: id }).select("name email location");
  return data;
}
export async function setUserSettings(id, data) {
  const uId = new mongoose.Types.ObjectId(id);
  const response = await User.aggregate([
    {
      $match: { _id: id },
    },
    {
      $addFields: {
        location: data,
      },
    },
  ]);
  return data;
}
