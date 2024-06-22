import React from "react";

export default function () {
  return (
    <main className="p-3 max-w-4xl mx-auto ">
      <h1 className=" text-3xl font-semibold my-4">Add Property Details</h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            id="name"
            required
            placeholder="Name"
            className="border p-3 rounded-lg w-full"
          />
          <textarea
            type="text"
            id="description"
            required
            placeholder="Description"
            className="border rounded-lg  w-full mt-2  h-20"
          />
          <input
            type="text"
            id="address"
            required
            placeholder="Address"
            className="border p-3 rounded-lg w-full my-2"
          />
          {/* //left side  */}
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2 flex-wrap">
              <label htmlFor="sale">
                <input type="checkbox" name="sale" id="sale" className="mr-2" />
                Sale
              </label>

              <label htmlFor="rent">
                <input type="checkbox" name="rent" id="rent" className="mr-2" />
                Rent
              </label>

              <label htmlFor="parking">
                <input
                  type="checkbox"
                  name="parking"
                  id="parking"
                  className="mr-2"
                />
                Parking Spot
              </label>

              <label htmlFor="furnished">
                <input
                  type="checkbox"
                  name="furnished"
                  id="furnished"
                  className="mr-2"
                />
                Furnished
              </label>

              <label htmlFor="offers">
                <input
                  type="checkbox"
                  name="offers"
                  id="offers"
                  className="mr-2"
                />
                Offers
              </label>

              <label htmlFor="kitchen">
                <input
                  type="checkbox"
                  name="kitchen"
                  id="kitchen"
                  className="mr-2"
                />
                Kitchen
              </label>

              <label htmlFor="hall">
                <input type="checkbox" name="hall" id="hall" className="mr-2" />
                Hall
              </label>
            </div>

            <div className="flex flex-wrap gap-6">
              <label htmlFor="bedroomms">
                <input
                  type="number"
                  name="bedroomms"
                  id="bedroomms"
                  className="border w-10 h-10 mr-1"
                />
                Bed Rooms
              </label>

              <label htmlFor="bathrooms">
                <input
                  type="number"
                  name="bathrooms"
                  className="border w-10 h-10 mr-1"
                />
                Bath Rooms
              </label>

              <label htmlFor="regularprice">
                <input
                  type="number"
                  name="regularprice"
                  className="border w-10 h-10 mr-1"
                />
                Regular Price (/months)
              </label>
              <label htmlFor="discoountedprice">
                <input
                  type="number"
                  name="discoountedprice"
                  className="border w-10 h-10 mr-1"
                />
                Discounted Price (/months)
              </label>
            </div>
          </div>
        </div>
        {/* // right side */}
        <div className="flex flex-col flex-1 gap-5">
          <p className="">
            <span className="font-extrabold ">Images: </span>the first immage
            will the cover(max 6)
          </p>

          <div className="flex gap-max">
            <input type="file" className="my-2"></input>
            <span className=" border-green-700 hover:shadow-lg text-green-800 p-2">
              upload
            </span>
          </div>
          <button className="bg-slate-700 border p-3 w-7/12 self-center hover:bg-slate-600">
            Add Property
          </button>
        </div>
      </form>
    </main>
  );
}
