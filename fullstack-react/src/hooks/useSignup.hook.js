import { buildApiUrl, parseApiResponse } from "@/lib/api.js";
import { useMutation } from "@tanstack/react-query";

const createUser = async (user) => {
  const response = await fetch(buildApiUrl("user/create"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  return parseApiResponse(response, "Failed to create user");
};

export function useSignup() {
  return useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      console.log("User created successfully:", data);
    },
    onError: (error) => {
      console.error("Error creating user:", error.message);
    },
  });
}
