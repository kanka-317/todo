import { Button } from "@/components/ui/button";
import { TasksContext } from "@/context/tasks.context.jsx";
import { extractQueryString } from "@/lib/extractQueryString.js";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function buildQuery(params) {
  const query = new URLSearchParams();
  const limit = params?.get("limit");
  const page = params?.get("page");
  const order = params?.get("order");

  if (limit) query.set("limit", limit);
  if (page) query.set("page", page);
  if (order) query.set("order", order);

  return query.toString();
}

export function TaskPagination() {
  const { tasks } = useContext(TasksContext);
  const navigate = useNavigate();

  const links = tasks?.pagination?.links;
  if (!links?.current) {
    return null;
  }

  const currentParams = extractQueryString(links.current);
  const prevParams = links.prev ? extractQueryString(links.prev) : null;
  const nextParams = links.next ? extractQueryString(links.next) : null;

  const currentPage =
    Number(currentParams.get("page")) ||
    Number(tasks?.pagination?.meta?.currentPage) ||
    1;
  const totalPages =
    Number(tasks?.pagination?.meta?.totalPages) ||
    Number(tasks?.pagination?.meta?.lastPage) ||
    undefined;

  const handleNavigate = (params) => {
    if (!params) return;
    const query = buildQuery(params);
    navigate(query ? `/tasks?${query}` : "/tasks");
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={!prevParams}
        onClick={() => handleNavigate(prevParams)}
      >
        Prev
      </Button>
      <span className="text-sm text-muted-foreground">
        Page {currentPage}
        {totalPages ? ` / ${totalPages}` : ""}
      </span>
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={!nextParams}
        onClick={() => handleNavigate(nextParams)}
      >
        Next
      </Button>
    </div>
  );
}
