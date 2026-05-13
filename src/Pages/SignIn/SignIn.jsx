import { useContext, useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";
import axiosInstance from "../../api/axiosInstance";
import authBg from "../../assets/images/auth-bg.webp";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const authBackgroundStyle = {
  backgroundImage: `
    linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.82),
      rgba(20, 53, 69, 0.55)
    ),
    url(${authBg})
  `,
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters").max(50),
});

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, googleSignIn, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data) => {
    try {
      const userCredential = await signIn(data.email, data.password);
      const firebaseUser = userCredential.user;

      const res = await fetch(
        `${import.meta.env.VITE_baseUrl}/users?email=${firebaseUser.email}`,
      );
      if (!res.ok) throw new Error("Failed to fetch database user");

      const dbUser = await res.json();

      const fullUser = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        name: firebaseUser.displayName,
        image: firebaseUser.photoURL,
        ...dbUser?.data?.[0],
      };

      setUser(fullUser);

      Swal.fire({
        title: "Success!",
        text: "Signed in successfully",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate(location.state ? location.state : "/");
      });
    } catch (error) {
      console.error(error);
      let errorMessage = error.message;

      if (error.code === "auth/invalid-credential") {
        errorMessage = "Invalid email or password";
      }

      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleGoogle = async (e) => {
    e.preventDefault();

    try {
      const result = await googleSignIn();
      const loggedUser = result.user;

      const userInfo = {
        displayName: loggedUser.displayName,
        email: loggedUser.email,
        photoURL: loggedUser.photoURL,
        role: "user",
        provider: "google",
        password: null,
      };

      await axiosInstance.post("/users", userInfo);

      Swal.fire({
        title: "Success!",
        text: "User SignIn successfully",
        icon: "success",
        confirmButtonText: "OK",
      });

      navigate(location.state ? location.state : "/");
    } catch (error) {
      console.error(error.code, error.message);

      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div
      className="min-h-screen py-10 px-4 md:px-6 bg-cover bg-center bg-no-repeat bg-fixed"
      style={authBackgroundStyle}
    >
      <div className="max-w-7xl mx-auto">
        <div className="w-full md:w-3/4 lg:w-1/2 bg-black/45 backdrop-blur-sm rounded-xl border border-white/20">
          <h2 className="text-4xl md:text-5xl font-bold text-center my-5 text-primary">
            Sign In
          </h2>
          <form className="px-10" onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="text-md text-white">Email</span>
              </label>
              <input
                type="email"
                placeholder="Your email"
                className="input"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="form-control mb-6">
              <label className="label">
                <span className="text-md text-white">Password</span>
              </label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Your password"
                  className="input w-full"
                  {...register("password")}
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-black"
                >
                  {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button
                type="submit"
                className={`w-full py-3 rounded-lg text-md font-medium transition-colors duration-300
                ${
                  isSubmitting
                    ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                    : "bg-primary text-white cursor-pointer"
                }`}
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </button>
            </div>
          </form>
          <div className="form-control mt-6 px-10">
            <button
              onClick={handleGoogle}
              className="btn bg-base-400 text-md font-medium normal-case"
            >
              <FcGoogle className="text-2xl"></FcGoogle>Google Sign In
            </button>
          </div>
          <p className="px-10 mt-4 mb-5 text-white">
            New to the site?{" "}
            <Link to="/signUp" className="text-primary">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
