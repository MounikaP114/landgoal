import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-2 max-w-lg mx-auto">
      <h1 className="m-5 font-semibold text-2xl flex  items-center justify-center">
        Profile
      </h1>
      <form className="flex flex-col gap-4 ">
        <img
          src={currentUser.avatar}
          alt="profile"
          className="rounded-full mt-2 cursor-pointer object-cover self-center h-24 w-24"
        ></img>
        <input
          type="text "
          placeholder="username"
          value={currentUser.username}
          className="border bg-slate-100 p-3 rounded-lg"
        ></input>
        <input
          type="text "
          placeholder="email"
          value={currentUser.email}
          className="border bg-slate-100 p-3 rounded-lg"
        ></input>
        <input
          type="text "
          placeholder="password"
          value={"**********"}
          className="bg-slate-100 p-3 rounded-lg border"
        ></input>
        <button className="bg-slate-500 p-3 rounded-lg uppercase hover:opacity-95">
          Update
        </button>
        <button className=" bg-green-500 p-3 rounded-lg uppercase hover:opacity-95">
          Creat listing
        </button>
      </form>
      <div className="mt-5 flex text-gray-800 justify-between cursor-pointer">
        <span className="">Delete Acccount</span>
        <span className="">SignOut</span>
      </div>
      <p className="mt-4 flex justify-center items-center cursor-pointer">
        ShowListing
      </p>
    </div>
  );
}
