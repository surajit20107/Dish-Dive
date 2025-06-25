"use client";
import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const handleSearch = () => {
    if (search) {
      router.push(`/search/${search}`)
      setSearch("")
    }
  }
  return (
    <div className="h-16 bg-slate-700 text-white flex items-center justify-between">
      <nav className="flex justify-between w-full items-center px-2">
        <div>
          <Link href="/">
            <h1 className="text-xl font-semibold">DishDive</h1>
          </Link>
        </div>
        {/* search dish by name */}
        <div className="px-2 flex justify-center items-center relative">
          <Search 
            className="text-white absolute left-4 transform-translate-y-1/2" 
            style={{ height:"24px", width:"24px" }}
            />
          <input
            type="text"
            placeholder="Search Dish"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            onKeyDown={(e)=>e.key==="Enter" && handleSearch()}
            className="px-10 py-1 rounded-lg border border-white w-46"
          />
        </div>
      </nav>
    </div>
  );
};

export default Header;
