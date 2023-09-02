import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import User from "../components/MyAccount/UserSetting";
import { useUserDataExpiration } from "../components/SessionExpire/useUserDataExpiration";

const MyAccount = () => {
  const navigate = useNavigate();
  // Call the custom hook to handle user data expiration
  useUserDataExpiration();

  // Retrieve user data from localStorage
  const storedUserData = localStorage.getItem("userData");
  const user = storedUserData ? JSON.parse(storedUserData) : null;
  console.log(storedUserData);

  // Check if the user is null and redirect to the home page
  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
      {user !== null && (
        <div className="w-11/12 md:w-4/5 m-auto">
          <div className="py-10 ">
            <div className="p-2">
              <h1 className=" text-3xl text-center font-bold text-black">
                My Account
              </h1>
            </div>
            <div className="mt-5">
              <User userData={user} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyAccount;
