import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Oauth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleGoogle = async () => {
    setLoading(true);
    try {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);
      console.log(result);
      const res = await fetch("/api/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("Google sign-in is not working", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full">
      <button
        onClick={handleGoogle}
        disabled={loading}
        type="button"
        className="bg bg-slate-100 p-3 rounded-lg w-full hover:opacity-95"
      >
        Continue with Google
      </button>
    </div>
  );
}
