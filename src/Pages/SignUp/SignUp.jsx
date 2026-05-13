import { Link, useNavigate } from "react-router-dom";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import authBg from "../../assets/images/auth-bg.webp";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosInstance from "../../api/axiosInstance";

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

const registerSchema = z.object({
  name: z.string().min(2, "Name is required"),

  email: z.email("Invalid email address"),

  phone: z
    .string()
    .min(11, "Phone number must be at least 11 digits")
    .regex(/^[0-9]+$/, "Phone number must contain only numbers"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain one uppercase letter")
    .regex(/[@$!%*?&]/, "Password must contain one special character"),
});

const SignUp = () => {
  const [acceptCondition, setAcceptCondition] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    const { name, email, phone, password } = data;

    try {
      const userCredential = await createUser(email, password);
      const user = userCredential?.user;

      await updateUserProfile(name);

      const userInfo = {
        uid: user?.uid,
        displayName: name,
        email,
        phone,
        role: "user",
        provider: "email",
      };
      await axiosInstance.post("/users", userInfo);

      Swal.fire({
        title: "Success!",
        text: "User created successfully",
        icon: "success",
      });

      navigate("/signIn");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message || error?.response?.data?.message,
        icon: "error",
      });
    } finally {
      setIsLoading(true);
    }
  };

  return (
    <div
      className="min-h-screen py-10 px-4 md:px-6 bg-cover bg-center bg-no-repeat bg-fixed"
      style={authBackgroundStyle}
    >
      <div className="max-w-7xl mx-auto">
        <div className="w-full md:w-3/4 lg:w-1/2 pb-5 bg-black/45 backdrop-blur-sm rounded-xl border border-white/20">
          <h2 className="text-4xl md:text-5xl font-bold text-center mt-3 text-primary">
            Sign Up
          </h2>
          <form className="px-10" onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <div className="form-control">
              <label className="label">
                <span className="text-md text-white">Name</span>
              </label>

              <input
                type="text"
                placeholder="Your name"
                className="input"
                {...register("name")}
              />

              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="text-md text-white">Email</span>
              </label>

              <input
                type="text"
                placeholder="Your email"
                className="input"
                {...register("email")}
              />

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="form-control">
              <label className="label">
                <span className="text-md text-white">Phone Number</span>
              </label>

              <input
                type="number"
                placeholder="Your phone number"
                className="input no-spinner"
                onWheel={(e) => e.target.blur()}
                {...register("phone")}
              />

              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="text-md text-white">Password</span>
              </label>

              <div className="flex items-center relative">
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
                  className="absolute right-4 text-black"
                >
                  {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Terms */}
            <div className="form-control my-5 flex-row gap-2">
              <input
                type="checkbox"
                checked={acceptCondition}
                onChange={(e) => setAcceptCondition(e.target.checked)}
              />
              <span className="text-md text-white">
                Accept all terms and conditions.
              </span>
            </div>

            {/* Submit */}
            <div className="form-control">
              <button
                type="submit"
                disabled={!acceptCondition || isLoading}
                className={`w-full py-3 rounded-lg text-md font-medium transition-colors duration-300
                ${
                  acceptCondition
                    ? "bg-primary text-white cursor-pointer"
                    : "bg-gray-400 text-gray-700 cursor-not-allowed"
                }`}
              >
                {isLoading ? "Loading..." : "Register"}
              </button>
            </div>
          </form>
          <p className="px-10 mt-4 text-white pb-10">
            Already have an account?{" "}
            <Link to="/signIn" className="text-primary">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
