import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

// match /{allPaths=**} {
//   allow read;
//   allow write:
//   if request.resource.size < 2* 1024 * 1024
//   && request.resource.contentType.matches('image/.*')

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [fileUploadProgress, setFileUploadProgress] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  console.log(file);
  console.log(fileUploadProgress);
  console.log(fileUploadError);
  console.log(formData);

  useEffect(() => {
    if (file) {
      handleUploadFile(file);
    }
  }, [file]);

  const handleUploadFile = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFileUploadProgress(Math.round(percent));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };
  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.id]: e.target.value });
  // };

  return (
    <div className="p-2 max-w-lg mx-auto">
      <h1 className="m-5 font-semibold text-2xl flex  items-center justify-center">
        Profile
      </h1>
      <form className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          hidden
          ref={fileRef}
          accept="image/*"
        ></input>
        <img
          src={formData.avatar||currentUser.avatar}
          onClick={() => fileRef.current.click()}
          alt="profile"
          className="rounded-full mt-2 cursor-pointer object-cover self-center h-24 w-24"
        ></img>
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">Error While Uploading Image</span>
          ) : fileUploadProgress > 0 && fileUploadProgress < 100 ? (
            <span className="text-green-700">
              {`Uploading ${fileUploadProgress}%`}
            </span>
          ) : fileUploadProgress === 100 ? (
            <span className="text-green-700">Image uploaded sccessfully!</span>
          ) : (
            ""
          )}
        </p>
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
      <div className="mt-5 flex text-red-800 justify-between cursor-pointer colo">
        <span>Delete Acccount</span>
        <span>SignOut</span>
      </div>
      <p className="mt-4 flex justify-center items-center cursor-pointer text-green-700">
        ShowListing
      </p>
    </div>
  );
}
