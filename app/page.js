"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

const Home = () => {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([])
  const router = useRouter();
  const getData = async () => {
    const data = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian",
    );
    setData(data.data.meals);
  };

  const getCategory = async () => {
    const data = await axios.get("https://www.themealdb.com/api/json/v1/1/categories.php")
    setCategory(data.data.categories)
  }

  useEffect(() => {
    getData();
    getCategory();
  }, []);
console.log(category)
  return (
    <div>
      <div
        className="flex w-full overflow-x-auto p-2"
        style={{ scrollbarWidth: "none" }}
      >
        <style jsx>{`
    div::-webkit-scrollbar {
      display: none;
    }
  `}</style>
        {data.map((item) => {
          return (
            <div key={item.idMeal} className="flex-shrink-0 h-30 w-30">
              <div className="flex justify-center items-center w-30">
                <img
                  className="flex h-24 w-24 rounded-full object-cover"
                  src={item?.strMealThumb}
                  alt={item?.idMeal}
                  onClick={() => router.push(`/${item.idMeal}`)}
                />
              </div>
              <p className="text-center text-sm mt-1 truncate">
                {item?.strMeal}
              </p>
            </div>
          );
        })}
      </div>
      <hr style={{margin: "20px 0"}} />
      <div className="mt-4">
        <h1 className="text-center text-2xl font-bold mb-4">Categories</h1>
  <div className="grid grid-cols-2 gap-4 sm:grid-cols-1 md:grid-cols-2 mx-4">
    {category.map((item) => {
      return (
        <div key={item?.idCategory} className="text-center bg-zinc-200 rounded-md shadow-md shadow-slate-300 cursor-pointer"
          onClick={()=>router.push(`/category/${item.strCategory}`)}
          >
          <img
            src={item?.strCategoryThumb}
            alt={item?.strCategory}
            className="w-full h-auto rounded-lg object-cover"
          />
          <p className="text-center text-sm mt-1 font-semibold md:text-3xl">{item?.strCategory}</p>
        </div>
      );
    })}
  </div>
</div>

    </div>
  );
};

export default Home;
