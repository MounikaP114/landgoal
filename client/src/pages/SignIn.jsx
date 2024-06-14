import React from "react";
<<<<<<< HEAD
import { Link } from "react-router-dom";
=======
import SignUp from "./SignUp";
import { Link } from "react-router-dom";
Link;
>>>>>>> 826a9123f8837c265199cf914c605cca35a80df0

export default function SignIn() {
  return (
    <div className="flex h-dvh">
      {/* Left side - Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white">
        <h1 className="text-3xl text-center font-semibold mb-6">Sign In</h1>
        <form className="flex flex-col justify-center items-center space-y-6 w-3/4 ">
          <input
<<<<<<< HEAD
            className="p-4 bg-slate-100 border rounded-lg w-full  hover:bg-slate-200 focus:outline-none"
=======
            className="p-4 bg-slate-100 border rounded-lg w-full"
>>>>>>> 826a9123f8837c265199cf914c605cca35a80df0
            type="text"
            placeholder="Email"
          />
          <input
<<<<<<< HEAD
            className="p-4 bg-slate-100 border rounded-lg w-full hover:bg-slate-200 focus:outline-none"
=======
            className="p-4 bg-slate-100 border rounded-lg w-full"
>>>>>>> 826a9123f8837c265199cf914c605cca35a80df0
            type="password"
            placeholder="Password"
          />
          <button className="bg-slate-700 text-white p-2 rounded-sm w-full hover:opacity-95">
            Sign In
          </button>
          <button className="bg-red-600 text-white p-2 rounded-sm w-full hover:opacity-95">
            Continue With Google
          </button>
<<<<<<< HEAD
          <p className="mt-4 flex">Don't Have an account!! </p>
          <Link to={"/signup"}>
=======
          <p className="mt-4 flex">Have an account!! </p>
          <Link to={"/singup"}>
>>>>>>> 826a9123f8837c265199cf914c605cca35a80df0
            <span className="text-blue-600 ml-2">Sign up</span>
          </Link>
        </form>
      </div>

      {/* Right side - Image */}
      <div className="flex-1">
        <img
          className="h-full w-full"
          src="https://images.pexels.com/photos/7599735/pexels-photo-7599735.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Login visual"
        />
      </div>
    </div>
  );
}
