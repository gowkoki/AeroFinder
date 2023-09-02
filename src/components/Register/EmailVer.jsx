import React, { useContext, useState } from "react";
import { StepperContext } from "./contexts/StepperContext";

const EmailVer = ({ verifyEmail }) => {
  const { userData, setUserData } = useContext(StepperContext);
  const [userEmailOtp, setUserEmailOtp] = useState("");

  // Extracting the required parts from the email address
  const [username, domain] = userData.email.split("@");
  const maskedEmail = `${username.slice(0, 2)}**@${domain}`;

  // Function to handle input in the OTP fields
  const handleChange = (e, index) => {
    const { value } = e.target;
    const emailOtpArray = [...userEmailOtp];
    emailOtpArray[index] = value;
    setUserEmailOtp(emailOtpArray.join(""));
    setUserData((prevUserData) => ({
      ...prevUserData,
      userEmailOtp: emailOtpArray.join(""),
    }));
  };

  // Function to handle OTP resend request
  const handleClick = async () => {
    const isVerified = await verifyEmail(userData.email);
    if (isVerified.isValid) {
      // Add emailotp to userData
      setUserData((prevUserData) => ({
        ...prevUserData,
        emailOtp: isVerified.emailOtp,
      }));
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-5">
      <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
        <div className="flex flex-col items-center justify-center text-center space-y-2">
          <div className="font-semibold text-3xl">
            <p>Email Verification</p>
          </div>
          <div className="flex flex-row text-sm font-medium text-gray-400">
            <p>
              We have sent a code to your email{" "}
              <span className="font-bold">{maskedEmail}</span>
            </p>
          </div>
        </div>

        <div>
          <form method="post">
            <div className="flex flex-col space-y-16">
              <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                {/* Input fields for OTP */}
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="w-14 h-14">
                    <input
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-gray-700"
                      type="text"
                      value={userEmailOtp[index] || ""}
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

export default EmailVer;
