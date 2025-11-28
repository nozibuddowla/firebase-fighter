import React, { useContext, useState } from "react";
import MyContainer from "../components/MyContainer";
import { Link, useNavigate } from "react-router";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { toast } from "react-toastify";
import { IoEyeOff } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const SignUp = () => {
  const [show, setShow] = useState(false);
  const {
    createUser,
    updateUser,
    emailVerification,
    setLoading,
    logOut,
    setUser,
  } = useContext(AuthContext);
  const navigate = useNavigate()

  const handleSignup = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const photo = event.target.photo.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    console.log("signup function entered!", { name, email, photo, password });

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 8 characters long and include uppercase and lowercase letters, a number, and a special character."
      );
      return;
    }

    // 1st step: Create user
    createUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // 2nd step: Update profile
        updateUser(name, photo)
          .then(() => {
            // 3rd step: Email verification
            emailVerification()
              .then(() => {
                setLoading(false);

                // Signout user
                logOut()
                  .then(() => {
                    toast.success(
                      "Signup successful! Check your email to active your account. "
                    );
                    setUser(null);
                    navigate("/signin")
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              })
              .catch((error) => {
                toast.error(error.message);
              });
          })
          .catch((error) => {
            toast.error(error.message);
          });
      })
      .catch((error) => {
        console.log(error);
        console.log(error.code);
        if (error.code === "auth/email-already-in-use") {
          toast.error("User already exists in database!");
        } else if (error.code === "auth/invalid-email") {
          toast.error("Please enter a valid email address!");
        } else if (error.code === "auth/weak-password") {
          toast.error("Password must be at least 6 characters!");
        } else if (error.code === "auth/user-not-found") {
          toast.error("No user found with this email!");
        } else if (error.code === "auth/wrong-password") {
          toast.error("Incorrect password. Please try again!");
        } else if (error.code === "auth/too-many-requests") {
          toast.error("Too many login attempts. Try again later!");
        } else if (error.code === "auth/popup-closed-by-user") {
          toast.error("Authentication popup closed before completion!");
        } else if (error.code === "auth/cancelled-popup-request") {
          toast.error("Authentication popup request was cancelled!");
        } else {
          toast.error(error.message);
        }
      });
  };
  return (
    <div className="min-h-[96vh] flex items-center justify-center bg-linear-to-br from-indigo-500 via-purple-600 to-pink-500 relative overflow-hidden">
      {/* Animated floating circles */}
      <div className="absolute inset-0">
        <div className="absolute w-72 h-72 bg-pink-400/30 rounded-full blur-2xl top-10 left-10 animate-pulse"></div>
        <div className="absolute w-72 h-72 bg-purple-400/30 rounded-full blur-2xl bottom-10 right-10 animate-pulse"></div>
      </div>

      <MyContainer>
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 p-6 lg:p-10 text-white">
          <div className="max-w-lg text-center lg:text-left">
            <h1 className="text-5xl font-extrabold drop-shadow-lg">
              Create Your Account
            </h1>
            <p className="mt-4 text-lg text-white/80 leading-relaxed">
              Join our community and unlock exclusive features. Your journey
              begins here!
            </p>
          </div>

          <div className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8">
            <h2 className="text-2xl font-semibold mb-6 text-center text-white">
              Sign Up
            </h2>

            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="no one"
                  className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Photo</label>
                <input
                  type="text"
                  name="photo"
                  placeholder="Your photo URL here"
                  className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                  className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  type={show ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <span
                  onClick={() => setShow(!show)}
                  className="absolute right-2 top-9 cursor-pointer z-50"
                >
                  {show ? <FaEye /> : <IoEyeOff />}
                </span>
              </div>

              <button type="submit" className="my-btn">
                Sign Up
              </button>

              <div className="text-center mt-3">
                <p className="text-sm text-white/80">
                  Already have an account?{" "}
                  <Link
                    to="/signin"
                    className="text-pink-300 hover:text-white font-medium underline"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default SignUp;
