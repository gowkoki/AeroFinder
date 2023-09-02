import React, { useEffect } from "react";

export const useUserDataExpiration = () => {
  useEffect(() => {
    // Check if user data has expired in localStorage
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData && userData.expirationTime <= Date.now()) {
      localStorage.removeItem("userData");
    }
  }, []);
};
