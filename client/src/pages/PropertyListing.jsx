import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useState } from "react";
import { app } from "../firebase";

export default function () {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const [fileUploadError, setFileUploadError] = useState(false);
  // console.log(files);
  // console.log(formData);

  const handleSubmit = async () => {
    try {
    } catch (error) {}
  };
  const handleUploads = async (e) => {
    if (files.length === 0)
      return setFileUploadError("please upload atleast one image");
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      console.log(promises);
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
        })
        .catch((error) => {
          setFileUploadError("Image files size should be less than 2 Mb");
        });
      setFileUploadError(true);
    } else {
      setFileUploadError("Only maximum 6 images are allowed");
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      console.log(fileName);
      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Optional: You can track the progress of the upload here
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },

        (error) => {
          // Handle unsuccessful uploads
          reject(error);
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const deleteUploadImage = (index) => {
  setFormData({...formData,
   imageUrls: formData.imageUrls.filter((_, id)=> id!==index)
  })
  };
  return (
    <main className="p-3 max-w-4xl mx-auto ">
      <h1 className=" text-3xl font-semibold my-4 mb-10 text-center">
        Add Property Details
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-10"
      >
        {/* /* right side */}
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
            className="border rounded-lg  w-full mt-2  h-20 p-2"
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
                  id="bathrooms"
                  className="border w-10 h-10 mr-1"
                />
                Bath Rooms
              </label>

              <label htmlFor="regularprice">
                <input
                  type="number"
                  name="regularprice"
                  id="regularprice"
                  className="border w-20 h-10 mr-1 p-2"
                />
                Regular Price ($/months)
              </label>
              <label htmlFor="discoountedprice">
                <input
                  type="number"
                  name="discoountedprice"
                  id="discountedprice"
                  className="border w-20 h-10 mr-1 p-2"
                />
                Discounted Price
              </label>
            </div>
          </div>
        </div>
        {/* /* // right outline-green-600 side */}
        <div className="flex flex-col flex-1 gap-5">
          <p className="">
            <span className="font-extrabold ">Images: </span>the first image is
            the cover(max 6)
          </p>
          <div className="flex gap-max">
            <input
              type="file"
              id="image"
              className="my-2 border p-2"
              multiple
              accept="image/*"
              onChange={(e) => setFiles(e.target.files)}
            ></input>
            <button
              type="button"
              onClick={handleUploads}
              className=" hover:shadow-lg text-green-800 w-20 h-10 mt-3 text-center p-1 rounded-lg"
            >
              upload
            </button>
          </div>
          {formData.imageUrls.map((url, index) => (
            <div key={url} className=" flex justify-between gap-10 items-center text-center ">
              <img
                className="w-20 h-20 rounded-lg object-contain"
                src={url}
                alt="upload-image"
              ></img>
              <button
                type="button"
                id="delete"
                onClick={()=>deleteUploadImage(index)}
                className=" border hover:bg-red-700 bg-red-600 p-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          ))}
          <p className="text-red-700">{fileUploadError && fileUploadError}</p>
          <button className="bg-slate-700 border p-3 w-7/12 self-center hover:bg-slate-600 rounded-lg">
            Add Property
          </button>
        </div>
      </form>
    </main>
  );
}
