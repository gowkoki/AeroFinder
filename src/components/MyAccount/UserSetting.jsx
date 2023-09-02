import React, { useState } from "react";
import PhoneInput from "react-phone-number-input"; //phone number with country code
import "react-phone-number-input/style.css";
import axios from "axios";
import zxcvbn from "zxcvbn";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserSetting = (userData) => {
  const navigate = useNavigate();
  const userinfo = userData.userData.user;
  const user_id = userinfo._id;
  console.log(user_id);

  const [activeSection, setActiveSection] = useState("section1");
  // State variables to store user data and form inputs
  const [firstName, setFirstName] = useState(userinfo.firstName);
  const [lastName, setLastName] = useState(userinfo.lastName);
  const [email, setEmail] = useState(userinfo.email);
  const [mobile, setMobile] = useState(userinfo.mobile);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  let passwordStrength = 0;

  // Function to toggle the active section in the user settings
  const handleSectionToggle = (sectionId) => {
    setActiveSection((prevSection) =>
      prevSection === sectionId ? null : sectionId
    );
  };

  // Function to handle the submission of the Profile Setting section
  const handleSection1Submit = async (e) => {
    e.preventDefault();
    try {
      console.log(firstName, lastName, email, mobile, user_id);
      // Send the form data to the backend API
      let endpoint = "http://localhost:8000/myAccount/profile";
      const response = await axios.put(endpoint, {
        firstName,
        lastName,
        email,
        mobile,
        user_id,
      });

      // Handle the response as needed
      console.log(response.data);
      if (response.data.message === "success") {
        toast.success("User details updated successfully");
      } else if (response.data.message === "error") {
        toast.error("User not found");
      } else {
        toast.error("Error in updating user data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle the submission of the Change Password section
  const handleSection2Submit = async (e) => {
    e.preventDefault();
    try {
      console.log(newPassword, confirmPassword, currentPassword, user_id);
      // Check if the new password and confirm password match
      if (newPassword === confirmPassword) {
        passwordStrength = zxcvbn(newPassword);
        console.log(passwordStrength.score);

        if (passwordStrength.score >= 3) {
          // Send the form data to the backend API
          let endpoint = "http://localhost:8000/myAccount/password";
          const response = await axios.put(endpoint, {
            newPassword,
            currentPassword,
            user_id,
          });

          // Handle the response as needed
          console.log(response.data);
          if (response.data.message === "success") {
            toast.success("User details updated successfully");
          } else if (response.data.message === "error") {
            toast.error("User not found");
          } else if (response.data.message === "incorrect") {
            toast.error("Current password is incorrect");
          } else {
            toast.error("Error in updating user data");
          }
        } else {
          toast.warn(
            "Password is too weak. Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
          );
        }
      } else {
        toast.warn("Entered new password and confirm password does not match");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle the submission of the Delete My Account section
  const handleSection3Submit = async (e) => {
    e.preventDefault();
    alert("Are you sure you want to Delete your Account?");
    try {
      // Send the user ID to the backend API for account deletion
      console.log(user_id);
      let endpoint = "http://localhost:8000/myAccount/deleteAccount";
      const response = await axios.delete(endpoint, {
        data: {
          user_id,
        },
      });
      console.log(response.data.message);

      if (response.data.message === "success") {
        toast.success("User data deleted sucessfully");
        localStorage.removeItem("userData");
        navigate("/");
      } else if (response.data.message === "error") {
        toast.error("User not found");
      } else {
        toast.error("Error in deleting user data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="space-y-4">
        {/* Profile Setting Section */}
        <div className="border rounded">
          <div
            className={`p-4 bg-gray-100 cursor-pointer ${
              activeSection === "section1" ? "bg-yellow-200" : ""
            }`}
            onClick={() => handleSectionToggle("section1")}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">Profile Setting</h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 transition-transform transform ${
                  activeSection === "section1" ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          {activeSection === "section1" && (
            <div className="p-4 bg-white">
              {/* Content of section 1  */}
              <div className="mt-5 flex flex-col justify-center items-center">
                <form className="w-full max-w-lg" action="PUT">
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
                        onChange={(e) => setFirstName(e.target.value)}
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
                        }}
                      />
                    </div>
                  </div>
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
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Phone Number
                      </label>
                      <PhoneInput
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        placeholder="Enter your phone number"
                        defaultCountry="GB"
                        value={mobile}
                        onChange={(value) => {
                          setMobile(value);
                        }}
                      />
                    </div>
                  </div>
                  <div className=" container flex justify-around mt-2 mb-6">
                    <button
                      type="submit"
                      className="bg-green-500 text-white uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out"
                      onClick={handleSection1Submit}
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
              <p className="text-xs">
                <b>Note :</b> If you would like to change the information in
                your profile, please enter new values and click the Save button.
                If you do not want to save changes you’ve entered, feel free to
                leave this Profile page without clicking on the Save button.
              </p>
            </div>
          )}
        </div>

        {/* Change Password Section */}
        <div className="border rounded">
          <div
            className={`p-4 bg-gray-100 cursor-pointer ${
              activeSection === "section2" ? "bg-yellow-200" : ""
            }`}
            onClick={() => handleSectionToggle("section2")}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">Change Password</h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 transition-transform transform ${
                  activeSection === "section2" ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          {activeSection === "section2" && (
            <div className="p-4 bg-white">
              {/* Content of section 2 */}
              <div className="mt-5 flex flex-col justify-center items-center">
                <form className="w-full max-w-lg" action="PUT">
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Current Password
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="password"
                        name="currentPassword"
                        placeholder="Enter your Current password"
                        value={currentPassword}
                        onChange={(e) => {
                          setCurrentPassword(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        New Password
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="password"
                        name="newPassword"
                        placeholder="New password"
                        value={newPassword}
                        onChange={(e) => {
                          setNewPassword(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Confirm Password
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className=" container flex justify-around mt-2 mb-6">
                    <button
                      type="submit"
                      className="bg-green-500 text-white uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out"
                      onClick={handleSection2Submit}
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
              <p className="text-xs">
                <b>Note : </b>Enter a password that is minimum eight characters,
                at least one uppercase letter, one lowercase letter, one number
                and one special character
              </p>
            </div>
          )}
        </div>

        {/* Delete My Account Section */}
        <div className="border rounded">
          <div
            className={`p-4 bg-gray-100 cursor-pointer ${
              activeSection === "section3" ? "bg-yellow-200" : ""
            }`}
            onClick={() => handleSectionToggle("section3")}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">Delete My Account</h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 transition-transform transform ${
                  activeSection === "section3" ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          {activeSection === "section3" && (
            <div className="p-4 bg-white">
              <div className="mt-5 flex flex-col justify-center items-center">
                <div className="p-4">
                  {" "}
                  <p className="text-red-500">
                    Deleting your account is an irreversible action. All your
                    data will be permanently deleted.
                  </p>
                </div>
                <form className="w-full max-w-lg">
                  <div className=" container flex justify-around mt-4 mb-6">
                    <button
                      type="submit"
                      className="bg-green-500 text-white uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out"
                      onClick={handleSection3Submit}
                    >
                      Delete
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSetting;
