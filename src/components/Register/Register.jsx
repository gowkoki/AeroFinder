import React, { useContext, useState } from "react";
import { StepperContext } from "./contexts/StepperContext";
import PhoneInput from "react-phone-number-input"; //phone number with country code
import "react-phone-number-input/style.css";

const Register = () => {
  // Use the StepperContext to access and update user data
  const { userData, setUserData } = useContext(StepperContext);
  // Use separate state variables for each form field
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Function to handle input changes for all form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update the corresponding field in userData using the setUserData function
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <form className="w-full max-w-lg" action="POST">
        {/* First Name and Last Name fields */}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              First Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border  border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              name="firstName"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                handleChange(e);
              }}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Last Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                handleChange(e);
              }}
            />
          </div>
        </div>

        {/* Email field */}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Email
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                handleChange(e);
              }}
            />
          </div>
        </div>

        {/* Phone Number field */}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Phone Number
            </label>
            <PhoneInput
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              placeholder="Enter your Phone Number"
              defaultCountry="GB"
              value={mobile}
              onChange={(value) => {
                setMobile(value);
                handleChange({
                  target: { name: "mobile", value },
                });
              }}
            />
          </div>
        </div>

        {/* Password and Confirm Password fields */}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Password
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border  border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="password"
              name="password"
              placeholder="***********"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                handleChange(e);
              }}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Confirm Password
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="password"
              name="confirmPassword"
              placeholder="************"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                handleChange(e);
              }}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
