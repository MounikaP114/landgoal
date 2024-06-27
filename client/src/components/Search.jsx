import React, { useState } from "react";
<<<<<<< HEAD
import { Navigate, useNavigate } from "react-router-dom";
=======
>>>>>>> 43d7f767162b6ff3b6aeba70f3010858dc2cfa4b

export default function Search() {
  const [filter, setFilter] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "createAt",
    order: "desc",
  });
<<<<<<< HEAD
  const navigate = useNavigate();
  console.log(filter);
=======
  console.log(filter)
>>>>>>> 43d7f767162b6ff3b6aeba70f3010858dc2cfa4b
  const handleChange = (e) => {
    if (
      e.target.id == "all" ||
      e.target.id === "rent" ||
      e.target.id == "sale"
    ) {
      setFilter({
        ...filter,
        type: e.target.id,
      });
    }
    if (e.target.id === "searchTerm") {
      setFilter({
        ...filter,
        searchTerm: e.target.value,
      });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "offer" ||
      e.target.id === "furnished"
    ) {
      setFilter({
        ...filter,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? "true" : "false",
      });
    }
<<<<<<< HEAD
    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";

      const order = e.target.value.split("_")[1] || "desc";

      setSidebardata({ ...sidebardata, sort, order });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", filter.searchTerm);
    urlParams.set("type", filter.type);
    urlParams.set("parking", filter.parking);
    urlParams.set("furnished", filter.furnished);
    urlParams.set("offer", filter.offer);
    urlParams.set("sort", filter.sort);
    urlParams.set("order", filter.order);

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
=======
    if (e.target.id === 'sort_order') {
        const sort = e.target.value.split('_')[0] || 'created_at';
  
        const order = e.target.value.split('_')[1] || 'desc';
  
        setSidebardata({ ...sidebardata, sort, order });
      }
>>>>>>> 43d7f767162b6ff3b6aeba70f3010858dc2cfa4b
  };
  return (
    <div className="flex flex-col md:flex-row ">
      <div className=" p-7 border-b-2 md:border-r-2  h-full">
<<<<<<< HEAD
        <form onSubmit={handleSubmit} className=" flex flex-col gap-3">
=======
        <form onSubmit="" className=" flex flex-col gap-3">
>>>>>>> 43d7f767162b6ff3b6aeba70f3010858dc2cfa4b
          <div className=" flex gap-2 items-center">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <input
              className="p-2 rounded-lg w-full border"
              id="searchTerm"
              placeholder="search..."
              type="text"
              onChange={handleChange}
            ></input>
          </div>
          <div className="flex gap-3 flex-wrap items-center">
            <label className="font-semibold"> Type:</label>
            <div className=" flex gap-1">
              <input
                type="checkbox"
                id="all"
                className="w-5"
                onChange={handleChange}
                checked={filter.type === "all"}
              ></input>
              <span>Rent&Sale</span>
            </div>
            <div className=" flex gap-1">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={filter.type === "rent"}
              ></input>
              <span>Rent</span>
            </div>
            <div className=" flex gap-1">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={filter.type === "sale"}
              ></input>
              <span>Sale</span>
            </div>
            <div className=" flex gap-1">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={filter.offer}
              ></input>
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-3 flex-wrap items-center">
            <label className="font-semibold"> Amenities:</label>
            <div className=" flex gap-1">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={filter.parking}
              ></input>
              <span>Parking</span>
            </div>
            <div className=" flex gap-1">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={filter.furnished}
              ></input>
              <span>Furnished</span>
            </div>
          </div>
          <div className="flex items-center gap-3 mb-20">
            <label className=" font-semibold">Sort:</label>
            <select
              id="sort-order"
              className="border rounded-lg p-3"
              defaultValue={"created_at_desc"}
            >
<<<<<<< HEAD
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
=======
              <option value='regularPrice_desc'>Price high to low</option>
              <option value='regularPrice_asc'>Price low to high</option>
              <option value='createdAt_desc'>Latest</option>
              <option value='createdAt_asc'>Oldest</option>
>>>>>>> 43d7f767162b6ff3b6aeba70f3010858dc2cfa4b
            </select>
          </div>
          <button className=" bg-slate-700 hover:opacity-95 w-full rounded-lg p-2 text-white text-lg">
            Search
          </button>
        </form>
      </div>

      <div className="">
        <h1 className="text-2xl p-7 font-semibold">Properties Results</h1>
      </div>
    </div>
  );
}
