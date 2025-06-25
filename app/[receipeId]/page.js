"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

export const dynamic = "force-dynamic";

const ReceipeId = () => {
  const [data, setData] = useState([]);
  const params = useParams();
  const getData = async () => {
    const data = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.receipeId}`,
    );
    setData(data.data.meals[0]);
  };
  useEffect(() => {
    getData();
  }, []);
  console.log(data);
  return (
    <div>
      {/* receipe name */}
      <div className="mt-4">
        <h1 className="font-bold text-3xl text-center text-zinc-700 leading-10 font-sans tracking-wide">
          {data?.strMeal}
        </h1>
      </div>
      {/* receipe image */}
      <div className="mt-4 flex justify-center items-center rounded-lg bg-white mx-auto max-w-2xl border-grey-300">
        <img
          className="w-6/5 h-auto rounded-lg shadow-lg shadow-zinc-300"
          src={data?.strMealThumb}
          alt={data.strMeal}
        />
      </div>
      {/* details */}
      <div className="mt-4 px-4">
        <p>Category: {data?.strCategory}</p>
        {data.tags && <p>Tags: {data?.strTags}</p>}
        <p></p>
      </div>
      {/* receipe Ingredient */}
      <div className="mt-4">
        <h1 className="mt-4 px-4 font-bold text-2xl">Ingredients</h1>
        <ul>
          {Object.keys(data).map((key, index) => {
            if (key.startsWith("strIngredient") && data[key]) {
              const number = key.replace("strIngredient", "");
              const measure = data[`strMeasure${number}`];
              return (
                <li key={key} className="px-6 text-sm text-grey-600 mt-1">
                  {measure?.trim()} {data[key]}
                </li>
              );
            }
            return null;
          })}
        </ul>
      </div>
      {/* receipe Instruction */}
      <div>
        <h1 className="mt-6 px-4 font-bold text-2xl">Instructions</h1>
        <div className="px-6 text-sm text-grey-600 mt-1 space-y-2">
          {data?.strInstructions &&
            (() => {
              const hasNumberedSteps = /\d+\.\s/.test(data.strInstructions);
              if (hasNumberedSteps) {
                // Handle numbered steps like "1. Do this. 2. Do that."
                const parts = data.strInstructions
                  .split(/\s*(\d+\.)\s+/)
                  .filter(Boolean);

                const steps = [];
                for (let i = 0; i < parts.length; i += 2) {
                  steps.push({ number: parts[i], text: parts[i + 1] || "" });
                }

                return steps.map((step, index) => (
                  <p key={index}>
                    <span className="font-semibold text-md text-blue-600">
                      {step.number}
                    </span>
                    <span className="ml-2 text-grey-600 text-md leading-6 font-normal font-sans">
                      {step.text.trim()}
                    </span>
                  </p>
                ));
              } else {
                // Handle plain text by splitting sentences
                return data.strInstructions
                  .split(/(?<=[.?!])\s+/)
                  .filter((sentence) => sentence.trim().length > 0)
                  .map((step, index) => (
                    <p key={index}>
                      <span className="font-semibold text-md text-blue-600">
                        {index + 1}.
                      </span>
                      <span className="ml-2 text-grey-600 text-md leading-6 font-normal font-sans">
                        {step.trim()}
                      </span>
                    </p>
                  ));
              }
            })()}
        </div>
      </div>
      {/* receipe video */}
      <div className="mt-4 px-4">
        <h1 className="mt-4 px-4 font-bold text-2xl">Video Tutorial</h1>
        <iframe
          className="mt-2"
          src={`https://www.youtube.com/embed/${data?.strYoutube?.split("v=")[1]}`}
          style={{border: "none"}}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default ReceipeId;
