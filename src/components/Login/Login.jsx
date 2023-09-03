import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();
    if (!email || !password) {
      toast.warn("Please enter all the fields");
    } else {
      try {
        let endpoint = "https://aerofinder-api.onrender.com/login";
        const response = await axios.post(
          endpoint,
          {
            email,
            password,
          },
          { withCredentials: true }
        );
        const data = response.data;

        // Check the response status for different scenarios
        if (data.status === "exist") {
          // Calculate the expiration timestamp (current time + 24 hours in milliseconds)
          const expirationTime = Date.now() + 86400000;

          // Prepare user data to be stored in localStorage
          const userData = {
            user: data.user,
            expirationTime: expirationTime,
          };
          // Store the user data in localStorage
          localStorage.setItem("userData", JSON.stringify(userData));
          // Show a success message and navigate to the home page
          toast.success("Login successful");
          navigate("/");
        } else if (data.status === "password incorrect") {
          toast.error("Incorrect password");
        } else {
          toast.error("User is not registered");
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <form className="w-full max-w-lg" action="POST">
        {" "}
        <h2 className="mt-6 mb-8 text-center text-3xl font-bold text-black">
          Login to AeroFinder
        </h2>
        <div className="flex flex-wrap -mx-3 mb-6">
          {/* Input field for email */}
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Email
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="email"
              placeholder="Enter your email address"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          {/* Input field for password */}
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Password
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="password"
              placeholder="Enter your password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </div>
        {/* Forget password link */}
        <a href="#" className="text-xs text-blue-600 hover:underline">
          Forget Password?
        </a>
        <div className=" container flex justify-around mt-6">
          {/* Submit button */}
          <button
            type="submit"
            className="bg-green-500 text-white uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out"
            onClick={submit}
          >
            Login
          </button>
        </div>
      </form>
      {/* Sign up link */}
      <p className="mt-8 text-xs font-light text-center text-gray-700">
        {" "}
        Don't have an account?{" "}
        <a
          href="/registerForm"
          className="font-medium text-blue-600 hover:underline"
        >
          Sign up
        </a>
      </p>
    </div>
  );
};

export default Login;
