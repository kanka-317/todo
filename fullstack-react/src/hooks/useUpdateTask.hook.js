import Cookies from "js-cookie";
import { buildApiUrl, parseApiResponse } from "@/lib/api.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Simulated function to post data to an API endpoint
const updateTask = async (task) => {
  /* get the token */
  const token = Cookies.get("token");
  if (!token) {
    throw new Error("Not authenticated. Please log in again.");
  }

  const taskId = task?._id ?? task?.id;
  if (!taskId) {
    throw new Error("Task id is required for update");
  }

  const response = await fetch(buildApiUrl("tasks"), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...task, _id: taskId }),
  });
  return parseApiResponse(response, "Failed to update task");
};

// Custom hook for patching todos
export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchTasks"] });
      queryClient.refetchQueries({
        queryKey: ["fetchTasks"],
        type: "active",
      });
    },
    onError: (error) => {
      // Handle error case
      console.error("Error updating task:", error);
    },
  });
}
