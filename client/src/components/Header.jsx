import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <header className=" bg-slate-200 shadow-md">
        <div className="flex justify-between items-center max-w-screen-lg mx-auto p-3">
          <Link to="/">
            <h1 className=" font-bold text-sm sm:text-xl flex flex-wrap">
              <span className="text-orange-500">Land</span>
              <span className="text-slate-700">Goal</span>
            </h1>
          </Link>

          <form className="bg-slate-100 rounded-lg p-3 flex items-center">
            <input
              className="focus:outline-none bg-transparent w-24 sm:w-64"
              type="text"
              placeholder="Search..."
            />

            <FaSearch className="text-slate-600"></FaSearch>
          </form>
          <ul className=" flex gap-1">
            <Link to="/home">
              <li className=" hidden sm:inline  text-slate-700 hover:underline">
                Home
              </li>
            </Link>

            <Link to="/about">
              <li className=" hidden sm:inline  text-slate-700 hover:underline">
                About
              </li>{" "}
            </Link>

            <Link to="/signin">
              <li className=" sm-inline  text-slate-700 hover:underline">
                Sign in
              </li>
            </Link>
          </ul>
        </div>
      </header>
      <div></div>
    </>
  );
}
