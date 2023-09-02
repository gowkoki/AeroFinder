import React from "react";
import Login from "../components/Login/Login";

const LoginForm = () => {
  return (
    <div className="md:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-white">
      <div className="container horizontal mt-5">
        <div className="mt-10  p-10">
          {" "}
          <Login />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
