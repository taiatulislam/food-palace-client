import { useContext, useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";

const authBackgroundStyle = {
  backgroundImage:
    "linear-gradient(135deg, rgba(0, 0, 0, 0.82), rgba(20, 53, 69, 0.55)), url(https://i.ibb.co/0t43r4M/top-view-fresh-delicious-chinese-food-dark-background.jpg)",
  backgroundSize: "cover",
  backgroundPosition: "center center",
};

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    const user = { email, password };

    signIn(email, password)
      .then((result) => {
        navigate(location.state ? location.state : "/");
        Swal.fire({
          title: "Success!",
          text: "SignIn successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
        fetch(`${import.meta.env.VITE_baseUrl}/users`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((res) => res.json())
          .then((data) => data);
      })
      .catch((error) => {
        console.error(error.code, error.message);
        return Swal.fire({
          title: "Error!",
          text: `${error.message}`,
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  const handleGoogle = (e) => {
    e.preventDefault();
    googleSignIn()
      .then((result) => {
        Swal.fire({
          title: "Success!",
          text: "User SignIn successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate(location.state ? location.state : "/");
      })
      .catch((error) => {
        console.error(error.code, error.message);
        Swal.fire({
          title: "Error!",
          text: `${error.message}`,
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <div className="py-10 px-4 md:px-6" style={authBackgroundStyle}>
      <div className="max-w-7xl mx-auto">
        <div className="w-full md:w-3/4 lg:w-1/2 bg-black/45 backdrop-blur-sm rounded-xl border border-white/20">
          <h2 className="text-4xl md:text-5xl font-bold text-center my-5 text-primary">
            Sign In
          </h2>
          <form className="px-10" onSubmit={handleForm}>
            <div className="form-control">
              <label className="label">
                <span className="text-md text-white">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Your email"
                className="input"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="text-md text-white">Password</span>
              </label>
              <div className="flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Your password"
                  className="input relative w-full"
                  required
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-black"
                >
                  {showPassword ? (
                    <BsEyeSlashFill className="absolute -mt-2 -ml-8"></BsEyeSlashFill>
                  ) : (
                    <BsEyeFill className="absolute -mt-2 -ml-8"></BsEyeFill>
                  )}
                </button>
              </div>
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-primary border-none text-md text-white font-medium normal-case">
                Sign In
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
