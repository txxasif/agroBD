"use client";
import { useReducer } from "react";
import SearchLocation from "../searchLoaction/searchLoaction";
import { Input } from "../ui/input";
import axios from "axios";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import queryFixer from "@/helper/serachHelper";
const initialSearchData = {
  division: "",
  district: "",
  upazilla: "",
  category: "ধান",
};
function searchReducer(state, action) {
  switch (action.type) {
    case "division":
      return { ...state, division: action.payload };
    case "district":
      return { ...state, district: action.payload };
    case "upazilla":
      return { ...state, upazilla: action.payload };
    case "category":
      return { ...state, category: action.payload };
    default:
      return state;
  }
}
export default function Search() {
  const category = [
    "ধান",
    "গম",
    "শাকসবজি",
    "ফল",
    "মাছ",
    "হাঁস-মুরগি",
    "গরু-ছাগল",
    "মসলা",
    "পাট",
    "অন্যান্য",
  ];
  const [state, dispatch] = useReducer(searchReducer, initialSearchData);
  const handleClick = async (e) => {
    e.preventDefault();
    const query = queryFixer(state);
    const url = `/api/search/${query}`;
    console.log("localhost:8000/", query);
    const res = await axios.get(url);
    console.log(res.data);
  };
  return (
    <div>
      <SearchLocation setLocation={dispatch} />
      <Select
        required
        onValueChange={(e) =>
          dispatch({
            type: "category",
            payload: e,
          })
        }
        defaultValue={category[0]}
      >
        <SelectTrigger id="framework">
          <SelectValue placeholder={"Category"} />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectGroup>
            {category.map((cat) => (
              <SelectItem value={cat}>{cat}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button onClick={handleClick}>Search</Button>
      <h1>
        {state.division} , {state.district} , {state.upazilla} ,{" "}
        {state.category}
      </h1>
    </div>
  );
}
