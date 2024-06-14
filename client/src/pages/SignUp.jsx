import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className="flex h-dvh">
      {/* Left side - Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white">
        <h1 className="text-3xl text-center font-semibold mb-6">Sign Up</h1>
        <form className="flex flex-col justify-center items-center space-y-6 w-3/4 ">
          <input
            className="p-4 bg-slate-100 border rounded-lg w-full  hover:bg-slate-200 focus:outline-none"
            type="text"
            placeholder="Username"
            onChange={handleChange}
          />
          <input
            className="p-4 bg-slate-100 border rounded-lg w-full  hover:bg-slate-200 focus:outline-none"
            type="text"
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            className="p-4 bg-slate-100 border rounded-lg w-full hover:bg-slate-200 focus:outline-none"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <button className="bg-slate-700 text-white p-2 rounded-sm w-full hover:opacity-95">
            Sign In
          </button>
          <button className="bg-red-600 text-white p-2 rounded-sm w-full hover:opacity-95">
            Continue With Google
          </button>
          <p className="mt-4 flex">Have an account!! </p>
          <Link to={"/singin"}>
            <span className="text-blue-600 ml-2">Sign in</span>
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
      <p>{formData}</p>
    </div>
  );
}
