import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signInFailure,
  signInSuccess,
  signInStart,
  signOutStart,
  signOutFailure,
  signOutSuccess,
} from "../redux/userSlice";
import { useNavigate,useParams } from "react-router-dom";
import { Link } from "react-router-dom";

// match /{allPaths=**} {
//   allow read;
//   allow write:
//   if request.resource.size < 2* 1024 * 1024
//   && request.resource.contentType.matches('image/.*')

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [fileUploadProgress, setFileUploadProgress] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateUserData, setUpdateUserData] = useState(false);
  const [listProperties, setListProperties] = useState([]);
  const [listPropertiesError, setListPropertiesError] = useState(false);
  const [loadingList, setLoadingList] = useState(false);
  const [deletePropertyError, setDeletePropertyError] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params=useParams()
  // console.log(file);
  // console.log(fileUploadProgress);
  // console.log(fileUploadError);
  // console.log(formData);
  //console.log(listProperties);
  // console.log(currentUser._id);

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
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFileUploadProgress(Math.round(progress));
        //console.log(`upload ${progress}% done`);
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
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateUserStart());

      const res = await fetch(`/api/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateUserData(true);
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserStart(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutStart());
      const res = await fetch("/api/signout");
      const data = await res.json();

      if (data.success === false) {
        dispatch(signOutFailure(data.message));
        return;
      }
      navigate("/signin");
      dispatch(signOutSuccess(data));
    } catch (error) {
      dispatch(signOutFailure(error.message));
    }
  };

  const handlePropertyList = async () => {
    try {
      setListPropertiesError(false);
      setLoadingList(true);
      const res = await fetch(`/api/properties-list/${currentUser._id}`);
      const data = await res.json();

      if (data.success === false) {
        setFileUploadError(data.message);
        setLoadingList(flase);
        return;
      }
      setListProperties(data);
      setLoadingList(false);
    } catch (error) {
      setFileUploadError(error.message);
      setLoadingList(false);
    }
  };

  const deleteProperty = async (propertyid) => {
    try {
      const res = await fetch(`/api/properties/delete/${propertyid}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        setDeletePropertyError(data.message);
        return;
      }
      setListProperties((prev) =>
        prev.filter((item) => propertyid !== item._id)
      );
    } catch (error) {
      setDeletePropertyError(error.message);
    }
  };
  return (
    <div className="p-2 max-w-lg mx-auto">
      <h1 className="m-5 font-semibold text-2xl flex  items-center justify-center">
        Profile
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          hidden
          ref={fileRef}
          accept="image/*"
        ></input>
        <img
          src={formData.avatar || currentUser.avatar}
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
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
          className="border bg-slate-100 p-3 rounded-lg"
        ></input>
        <input
          type="email "
          placeholder="email"
          id="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
          className="border bg-slate-100 p-3 rounded-lg"
        ></input>
        <input
          type="password"
          id="password"
          placeholder="password"
          onChange={handleChange}
          className="bg-slate-100 p-3 rounded-lg border"
        ></input>
        <button
          disabled={loading}
          className="bg-slate-500 p-3 rounded-lg uppercase hover:opacity-95"
        >
          {loading ? "loading" : "update"}
        </button>
        {showMessage && (
          <p className="text-green-700 self-center font-semibold">
            Updated Successfully
          </p>
        )}
        <Link
          to={"/create"}
          className=" bg-green-500 p-3 rounded-lg uppercase hover:opacity-95 text-center"
        >
          Add Property
        </Link>
      </form>
      <button
        type="button"
        disabled={loading}
        onClick={handlePropertyList}
        className="mt-4 cursor-pointer text-slate-900  bg-blue-400 w-full  p-3 rounded-lg"
      >
        {loadingList ? "Loading..." : "Show list Properties"}
      </button>
      <div className="mt-5 flex text-red-800 justify-between cursor-pointer colo">
        <span onClick={handleDelete}>Delete Acccount</span>
        <span onClick={handleSignOut}>SignOut</span>
      </div>
      <p className=" text-red-700 text-sm self-center">{error ? error : ""}</p>
      <p className="text-green-700 text-sm self-center"></p>
      <p>{listPropertiesError ? "Please Check and try  again" : ""}</p>
      <p className="text-red-700 text-sm mt-3">
        {deletePropertyError && deletePropertyError}
      </p>
      {listProperties.map((list) => (
        <div
          key={list._id}
          className="flex gap-3 rounded-lg border justify-between items-center bg-slate-100 hover:shadow-xl w-full m-3 "
        >
          <img
            src={list.imageUrls[0]}
            alt="property-image"
            className=" h-20 w-20 object-fill rounded-lg m-3"
          />
          <Link to={`/properties/${list._id}`}>
          <p className=" text-lg text-slate-700 hover:underline">{list.name}</p></Link>
         
          <div className="flex flex-col p-2 m-2">
            <button
              onClick={() => deleteProperty(list._id)}
              className="m-1 border bg-red-500 p-1 rounded-lg"
            >
              Delete
            </button>
            <Link to={`/update-property/${list._id}`}>
              <button type="button" className="m-1 border bg-green-500 p-1 rounded-lg">
                edit
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
