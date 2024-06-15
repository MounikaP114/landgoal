import { json } from "express";
import React, { forwardRef, useState } from "react";
import { Link } from "react-router-dom";
export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [loading, setloading] = useState(false);
  const [dataerror, setDataError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  console.log(formData);
  try {
    setloading(true);
    const onFormSubmit = async (e) => {
      e.preventDefault();
      const res = await fetch("/api/signup", {
        method: POST,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (dataerror.success === false) {
        setloading(false);
        setDataError(dataerror.message);

        return;
      }
      setloading(false);
      console.log(data);
    };
  } catch (error) {
    setloading(false);
    setDataError(dataerror.message);
  }

  return (
    <div className="flex h-dvh">
      {/* Left side - Login Form */}
      <div className="flex-1 flex flex-col ju stify-center items-center bg-white">
        <h1 className="text-3xl text-center font-semibold mb-6">Sign Up</h1>
        <form
          onSubmit={onFormSubmit}
          className="flex flex-col justify-center items-center space-y-6 w-3/4 "
        >
          <input
            className="p-4 bg-slate-100 border rounded-lg w-full "
            id="username"
            type="text"
            placeholder="Username"
            onChange={handleChange}
          />
          <input
            className="p-4 bg-slate-100 border rounded-lg w-full"
            type="text"
            id="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            className="p-4 bg-slate-100 border rounded-lg w-full"
            id="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          ></input>
          <button
            disabled={loading}
            className="bg-slate-700 text-white p-2 rounded-sm w-full hover:opacity-95"
          >
            {loading ? "Loading...." : "SignUp"}
          </button>
          <button className="bg-red-600 text-white p-2 rounded-sm w-full hover:opacity-95">
            Continue With Google
          </button>
          <p className="mt-4">Have an account? </p>
          <Link to={"/signin"}>
            <span className="text-blue-600 ml-2">Sign in</span>
          </Link>
        </form>
      </div>
      <p>{}</p>

      {/* Right side - Image */}
      <div className="flex-1">
        <img
          className="h-full w-full "
          src="https://images.pexels.com/photos/7599735/pexels-photo-7599735.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Login visual"
        />
      </div>
    </div>
  );
}
