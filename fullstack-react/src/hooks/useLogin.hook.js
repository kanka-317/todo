import Cookies from "js-cookie";
import { buildApiUrl, parseApiResponse } from "@/lib/api.js";
import { useMutation } from "@tanstack/react-query";

// Simulated function to post data to an API endpoint
const loginUser = async (user) => {
  const response = await fetch(buildApiUrl("auth/login"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return parseApiResponse(response, "Failed to login. Please try again.");
};

// Custom hook for posting todos
export function useLogin() {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (response) => {
      // This callback is triggered if the mutation is successful
      const token =
        response?.data?.accessToken || response?.accessToken || response?.token;
      const responseUser = response?.data?.user || response?.user;
      const firstName = response?.data?.firstName || response?.firstName;
      const lastName = response?.data?.lastName || response?.lastName;
      const email = response?.data?.email || response?.email;

      const user = responseUser || {
        firstName,
        lastName,
        email,
      };

      if (token) {
        Cookies.set("token", token, { expires: 1 });
      } else {
        console.error("Login response did not include an access token");
      }

      if (user?.firstName || user?.email) {
        Cookies.set("user", JSON.stringify(user), { expires: 1 });
      } else {
        Cookies.remove("user");
      }
    },
    onError: (error) => {
      // Handle error case
      console.error("Error authenticating:", error);
    },
  });
}
