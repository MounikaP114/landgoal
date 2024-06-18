import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccsess } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
function Oauth() {
  const dispact = useDispatch();
  const navigate = useNavigate();
  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

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
      dispact(signInSuccsess(data));
      navigate("/");
    } catch (error) {
      console.log("google sign is not working", error);
    }
  };

  return (
    <button
      onClick={handleGoogle}
      type="button"
      className="bg bg-slate-100 p-3 rounded-lg w-full hover:opacity-95"
    >
      Continue with google
    </button>
  );
}

export default Oauth;
