"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

const ReceipeId = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const params = useParams();
  const getData = async () => {
    const data = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${params.category}`,
    );
    setData(data.data.meals);
  };
  useEffect(() => {
    getData();
  }, []);
  console.log(data);
  return (
    <div>
      <div className="mt-4">
        <h1 className="text-center text-2xl font-bold mb-4">Categories</h1>
  <div className="grid grid-cols-2 gap-4 sm:grid-cols-1 md:grid-cols-2 mx-4">
    {data.map((item) => {
      return (
        <div key={item?.idMeal} className="text-center bg-zinc-200 rounded-md shadow-md shadow-slate-300 cursor-pointer"
          onClick={()=>router.push(`/${item.idMeal}`)}
          >
          <img
            src={item?.strMealThumb}
            alt={item?.strMeal}
            className="w-full h-auto rounded-lg object-cover"
          />
          <p className="text-center text-sm mt-1 font-semibold md:text-3xl">{item?.strMeal}</p>
        </div>
      );
    })}
  </div>
</div>
    </div>
  );
};

export default ReceipeId;
