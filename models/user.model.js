import User from "./user.schema";
import Post from "./post.schema";
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
export async function checkLogin(user) {
  let status = null;
  let data = null;
  try {
    const response = await User.findOne({ ...user }).select(
      "-password -posts -cart"
    );

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
