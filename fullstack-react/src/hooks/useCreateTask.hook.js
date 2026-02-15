import Cookies from "js-cookie";
import { buildApiUrl, parseApiResponse } from "@/lib/api.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Simulated function to post data to an API endpoint
const createTask = async (task) => {
  /* get the token */
  const token = Cookies.get("token");
  if (!token) {
    throw new Error("Not authenticated. Please log in again.");
  }

  const response = await fetch(buildApiUrl("tasks"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });
  return parseApiResponse(response, "Failed to create task. Please try again.");
};

// Custom hook for posting todos
export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchTasks"] });
      queryClient.refetchQueries({
        queryKey: ["fetchTasks"],
        type: "active",
      });
    },
    onError: (error) => {
      // Handle error case
      console.error("Error creating task:", error);
    },
  });
}
