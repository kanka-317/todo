import Cookies from "js-cookie";
import { buildApiUrl, parseApiResponse } from "@/lib/api.js";
import { useQuery } from "@tanstack/react-query";

const fetchTasks = async ({ queryKey }) => {
  const [_key, { order = "asc", limit = 10, page = 1 }] = queryKey;
  const token = Cookies.get("token");
  if (!token) {
    throw new Error("Not authenticated. Please log in again.");
  }

  const url = new URL(buildApiUrl("tasks"));
  const normalizedOrder = order === "desc" ? "dsc" : order;
  url.searchParams.append("order", normalizedOrder);
  url.searchParams.append("limit", String(limit));
  url.searchParams.append("page", String(page));

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return parseApiResponse(response, `Failed to fetch tasks (${response.status})`);
};

export function useFetchTasks(params = {}) {
  return useQuery({
    queryKey: ["fetchTasks", params],
    queryFn: fetchTasks,
    retry: false,
  });
}
