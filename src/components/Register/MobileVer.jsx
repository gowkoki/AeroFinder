import React, { useContext, useState } from "react";
import { StepperContext } from "./contexts/StepperContext";

const MobileVer = ({ verifyMobile }) => {
  const { userData, setUserData } = useContext(StepperContext);
  const [userOtp, setUserOtp] = useState("");

  // Extract the country code and last three digits from the mobile number
  const countryCode = userData.mobile.substring(0, 3);
  const lastThreeDigits = userData.mobile.substring(userData.mobile.length - 3);

  // Function to handle input in the OTP fields
  const handleChange = (e, index) => {
    const { value } = e.target;
    const otpArray = [...userOtp];
    otpArray[index] = value;
    setUserOtp(otpArray.join(""));
    setUserData((prevUserData) => ({
      ...prevUserData,
      userOtp: otpArray.join(""),
    }));
  };

  // Function to handle OTP resend request
  const handleClick = async () => {
    // Call the verifyMobile function passed as a prop
    const isMobileVerified = await verifyMobile(userData.mobile);
    if (isMobileVerified.isValid) {
      // Update the OTP value in userData if mobile verification is successful
      setUserData((prevUserData) => ({
        ...prevUserData,
        otp: isMobileVerified.otp,
      }));
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-5">
      <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
        <div className="flex flex-col items-center justify-center text-center space-y-2">
          <div className="font-semibold text-3xl">
            <p>Mobile Verification</p>
          </div>
          <div className="flex flex-row text-sm font-medium text-gray-400">
            <p>
              We have sent a code to your Phone Number{" "}
              <span className="font-bold">
                {countryCode} *** {lastThreeDigits}
              </span>
            </p>
          </div>
        </div>
        <div>
          <form method="post">
            <div className="flex flex-col space-y-16">
              <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                {/* Input fields for OTP */}
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="w-16 h-16">
                    <input
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-gray-700"
                      type="text"
                      value={userOtp[index] || ""}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col space-y-5">
                <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                  <p>Didn't recieve code?</p>{" "}
                  <a
                    className="flex flex-row items-center text-blue-600"
                    href="#"
                    onClick={handleClick}
                  >
                    Resend
                  </a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MobileVer;
