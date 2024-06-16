import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [dataerror, setDataError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    console.log(formData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (!data.success) {
        setLoading(false);
        setDataError(data.error);
        return;
      }

      setLoading(false);
      setDataError(null);
      navigate("/");
      // Handle successful response here
    } catch (error) {
      setLoading(false);
      setDataError(data.error);
    }
    navigate("/");
  };

  return (
    <div className="flex h-dvh">
      {/* Left side - Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white">
        <h1 className="text-3xl text-center font-semibold mb-6">Sign In</h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center space-y-6 w-3/4 "
        >
          <input
            className="p-4 bg-slate-100 border rounded-lg w-full focus:outline-none"
            type="text"
            id="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            className="p-4 bg-slate-100 border rounded-lg w-full focus:outline-none"
            id="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          ></input>
          <button
            disabled={loading}
            className="bg-slate-700 text-white p-2 rounded-sm w-full hover:opacity-95"
          >
            {loading ? "Loading...." : "SignIn"}
          </button>
        </form>
        <div className="flex mt-4">
          <p className="pr-5">Dont Have an account? </p>
          <Link to={"/signup"}>
            <span className="text-blue-600">Sign Up</span>
          </Link>
        </div>
        {dataerror && <p className="text-red-500 mt-5">{dataerror}</p>}
      </div>

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
