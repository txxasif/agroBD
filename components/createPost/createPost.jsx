'use client'
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { currentUserIdSelector } from "@/store/reducers/user.selector";
import { createPostAsync } from "@/store/reducers/post.reducer";

const initialValue = {
  title: "",
  description: "",
  category: "",
  price: "",
  quantity: "",
  unit: "",
  photo: null,
  seller: null,
};

export default function CreatePost() {
  const [form, setForm] = useState(initialValue);
  const id = useSelector(currentUserIdSelector);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    setForm((prevValues) => ({
      ...prevValues,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      ...form,
      seller: id,
    };
    dispatch(createPostAsync(data));
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8">
      <div className="bg-white rounded-lg shadow p-6 flex">
        <div className="w-1/2 pr-6">
          <h3 className="text-2xl font-bold">Create a new post</h3>
          <div className="mt-6">
            <label htmlFor="title" className="font-semibold">
              Title:
            </label>
            <input
              type="text"
              name="title"
              required
              value={form.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mt-6">
            <label htmlFor="description" className="font-semibold">
              Description:
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            ></textarea>
          </div>
        </div>
        <div className="w-1/2 pl-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="font-semibold">
                Category:
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="">Select a category</option>
                <option value="ধান">ধান</option>
                <option value="গম">গম</option>
                <option value="শাকসবজি">শাকসবজি</option>
                <option value="ফল">ফল</option>
                <option value="মাছ">মাছ</option>
                <option value="হাঁস-মুরগি">হাঁস-মুরগি</option>
                <option value="গরু-ছাগল">গরু-ছাগল</option>
                <option value="মসলা">মসলা</option>
                <option value="পাট">পাট</option>
                <option value="অন্যান্য">অন্যান্য</option>
              </select>
            </div>
            <div>
              <label htmlFor="unit" className="font-semibold">
                Unit:
              </label>
              <select
                name="unit"
                value={form.unit}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="">Select a unit</option>
                <option value="কেজি">কেজি</option>
                <option value="লিটার">লিটার</option>
                <option value="পিস">পিস</option>
                <option value="বস্তা">বস্তা</option>
              </select>
            </div>
            <div>
              <label htmlFor="price" className="font-semibold">
                Price:
              </label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor="quantity" className="font-semibold">
                Quantity:
              </label>
              <input
                type="number"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="image" className="font-semibold">
                Image:
              </label>
              <input
                type="file"
                name="photo"
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 text-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Post
        </button>
      </div>
    </form>
  );
}
