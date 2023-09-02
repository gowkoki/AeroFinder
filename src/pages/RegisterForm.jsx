import React, { useState } from "react";
import { isValidPhoneNumber } from "react-phone-number-input"; // phone number - to check the number is in correct format
import { toast } from "react-toastify"; // notification
import axios from "axios";
import zxcvbn from "zxcvbn"; //password - to check the strength of the password
import { StepperContext } from "../components/Register/contexts/StepperContext";
import Stepper from "../components/Register/Stepper";
import StepperControl from "../components/Register/StepperControl";
import Register from "../components/Register/Register";
import MobileV from "../components/Register/MobileVer";
import EmailV from "../components/Register/EmailVer";
import Complete from "../components/Register/Complete";

const RegisterForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState("");
  const [finalData, setFinalData] = useState([]);
  const steps = ["Register", "Mobile", "Email", "Completed"]; // Steps in the registration process

  //display the appropriate component based on the current step
  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Register />;
      case 2:
        return <MobileV verifyMobile={verifyMobile} />;
      case 3:
        return <EmailV verifyEmail={verifyEmail} />;
      case 4:
        return <Complete />;
      default:
    }
  };

  //validating the form fields
  const validateStep = async (
    firstName,
    lastName,
    email,
    mobile,
    password,
    confirmPassword
  ) => {
    //validate - all fields are required
    if (
      !firstName ||
      !lastName ||
      !email ||
      !mobile ||
      !password ||
      !confirmPassword
    ) {
      toast.warn("Please enter all the fields");
      return false;
    }

    //validate - password and confirm password are same
    if (password !== confirmPassword) {
      toast.warn("Entered password and confirm password does not match");
      return false;
    }

    //validate - password strength
    const passwordStrength = zxcvbn(password);
    if (passwordStrength.score < 3) {
      toast.warn(
        "Password is too weak. Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      );
      return false;
    }

    //validate - phone number format
    if (!isValidPhoneNumber(mobile)) {
      toast.warn("Invalid phone number");
      return false;
    }

    // Email format validation using regular expression
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.warn("Invalid email format");
      return false;
    }

    //validate - email is already registered
    try {
      const endpoint = `http://localhost:8000/emailChecker?email=${email}`;
      const emailExistResponse = await axios.get(endpoint);
      const data = emailExistResponse.data;
      //already registered
      if (data.status === "exist") {
        toast.error("This email is already registered");
        return false;
      } else if (data.status === "Not exist") {
        //validate - phone number verification by sending OTP via whatsapp
        const isMobileVerified = await verifyMobile(mobile);

        if (isMobileVerified.isValid) {
          setUserData((prevUserData) => ({
            ...prevUserData,
            otp: isMobileVerified.otp,
          }));
          return true;
        } else {
          return false;
        }
      }
    } catch (error) {
      console.error("Error checking email existence:", error);
      toast.error("Error checking email existence, please try again");
      return false;
    }
  };

  // verify mobile number using OTP
  const verifyMobile = async (mobile) => {
    try {
      const response = await axios.post(`http://localhost:8000/mobileV`, {
        mobile: mobile,
      });
      if (response.data.State === "failed") {
        toast.error(
          "Invalid Mobile Number, Please enter a valid Mobile Number"
        );
        return { isValid: false };
      } else if (response.data.State === "Sent") {
        toast.success("OTP has been sent successfully to your Mobile Number");
        return { isValid: true, otp: response.data.otp };
      }
    } catch (error) {
      console.error("Error verifying mobile number:", error);
      toast.error("Error verifying mobile number");
      return { isValid: false };
    }
  };

  // verify email using OTP
  const verifyEmail = async (email) => {
    try {
      const emailResponse = await axios.get(
        `http://localhost:8000/emailValidation?email=${email}`
      );

      if (emailResponse.status === 200) {
        toast.success("OTP has been successfully sent to your email");
        return { isValid: true, emailOtp: emailResponse.data.emailOtp };
      } else {
        toast.error("Invalid Email");
        window.location.reload();
        return { isValid: false };
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      toast.error("Error verifying email");
      window.location.reload();
      return { isValid: false };
    }
  };

  //handle the "Next" button click and navigate through the registration steps
  const handleClick = async (direction) => {
    if (direction === "next") {
      if (currentStep === 1) {
        // Step 1: Check if user entered details are correct
        const {
          firstName,
          lastName,
          email,
          mobile,
          password,
          confirmPassword,
        } = userData;
        // invoke the validateStep function to perform the validations
        const isValid = await validateStep(
          firstName,
          lastName,
          email,
          mobile,
          password,
          confirmPassword
        );
        console.log(isValid);
        if (!isValid) {
          // Validation failed, do not proceed to the next step
          return;
        }
        // Validations passed, move to the next step
        let newStep = currentStep + 1;
        newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
      } else if (currentStep === 2) {
        // Step 2: Validate the mobile number OTP
        const { otp, userOtp, email } = userData;
        const parsedUserOtp = parseInt(userOtp);

        if (otp === parsedUserOtp) {
          // Mobile OTP is valid, generate a new email OTP
          const isVerified = await verifyEmail(email);

          if (isVerified.isValid) {
            // Move to the next step
            let newStep = currentStep + 1;
            newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);

            // Add emailotp to userData
            setUserData((prevUserData) => ({
              ...prevUserData,
              emailOtp: isVerified.emailOtp,
            }));
          }
        } else {
          // Invalid OTP,
          window.location.reload();
          toast.error("Invalid OTP");
        }
      } else if (currentStep === 3) {
        // Step 3: Validate the email OTP
        const {
          emailOtp,
          userEmailOtp,
          firstName,
          lastName,
          email,
          mobile,
          password,
        } = userData;
        const parsedUserEmailOtp = parseInt(userEmailOtp);
        console.log(parsedUserEmailOtp, emailOtp);
        if (emailOtp === parsedUserEmailOtp) {
          // Email OTP is valid, save all the user data in the DB
          try {
            let endpoint = "http://localhost:8000/register";
            const registerResponse = await axios.post(endpoint, {
              firstName,
              lastName,
              email,
              mobile,
              password,
            });
            const data = registerResponse.data;

            if (data.status === "registered") {
              //move to final page
              let newStep = currentStep + 1;
              newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
            } else {
              toast.error("Invalid Email address");
              window.location.reload();
            }
          } catch (error) {
            console.error("Error in registration", error);
          }
        } else {
          window.location.reload();
          toast.error("Invalid OTP");
        }
      }
    }
  };

  return (
    <div className="md:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-white">
      <div className="container horizontal mt-5">
        <Stepper steps={steps} currentStep={currentStep} />
        {/* Display Components */}
        <div className="mt-10  p-10">
          <StepperContext.Provider
            value={{
              userData,
              setUserData,
              finalData,
              setFinalData,
            }}
          >
            {displayStep(currentStep)}
          </StepperContext.Provider>
        </div>
      </div>
      {/* next button */}
      <StepperControl
        handleClick={handleClick}
        currentStep={currentStep}
        steps={steps}
      />
    </div>
  );
};

export default RegisterForm;
