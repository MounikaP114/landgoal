import React from "react";
import { FaSearch } from "react-icons/fa";

export default function Header() {
  return (
    <>
      <header className=" bg-slate-200 shadow-md">
        <div className="flex justify-between items-center max-w-screen-lg mx-auto p-3">
          <h1 className=" font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-orange-500">Land</span>
            <span className="text-slate-700">Goal</span>
          </h1>

          <form className="bg-slate-100 rounded-lg p-3 flex items-center">
            <input
              className="focus:outline-none bg-transparent w-24 sm:w-64"
              type="text"
              placeholder="Search..."
            />

            <FaSearch className="text-slate-600"></FaSearch>
          </form>
          <ul className=" flex gap-1">
            <li className=" hidden sm:inline  text-slate-700 hover:underline">
              Home
            </li>
            <li className=" hidden sm:inline  text-slate-700 hover:underline">
              About
            </li>
            <li className=" sm-inline  text-slate-700 hover:underline">
              Sign in
            </li>
          </ul>
          {/* <ul className="flex gap-4">
            <li className=" hover:underline ">Home</li>
            <li className=" hover:underline">About</li>
            <li className=" hover:underline">Sign in</li>
          </ul> */}
        </div>
      </header>
      <div></div>
    </>
  );
}
