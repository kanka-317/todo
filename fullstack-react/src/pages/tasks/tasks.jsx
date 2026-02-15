/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";

import { FilterBar } from "@/components/filteBar/filterBar.jsx";
import { Skeleton } from "@/components/ui/skeleton";
import { Task } from "@/components/task/task.jsx";
import { TaskSidebar } from "@/components/taskSidebar/taskSidebar.jsx";
import { TasksContext } from "@/context/tasks.context.jsx";
import { TasksCounter } from "@/components/tasksCounter/tasksCounter.jsx";
import { useFetchTasks } from "@/hooks/useFetchTasks.hook.js";
import { useSearchParams } from "react-router-dom";

function DisplaySkeleton() {
  return (
    <div className="flex items-center space-x-4 mb-12">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[500px]" />
        <Skeleton className="h-4 w-[400px]" />
      </div>
    </div>
  );
}

function todaysDate() {
  const today = new Date();

  // Define options for toLocaleDateString()
  const options = {
    weekday: "long", // full name of the day
    day: "numeric", // numeric day
    month: "short", // abbreviated month
    year: "numeric", // numeric year
  };

  // Format the date
  const formattedDate = today.toLocaleDateString("en-GB", options);
  return formattedDate;
}

function normalizeTasksPayload(payload) {
  if (!payload) return null;

  const normalizeTaskStatus = (task) => {
    if (!task) return task;

    if (task.status === "in-progress") {
      return { ...task, status: "inProgress" };
    }

    return task;
  };

  const normalizeTaskList = (list) =>
    Array.isArray(list) ? list.map(normalizeTaskStatus) : [];

  const fallbackPagination = {
    meta: payload.meta ?? {},
    links: payload.links ?? {},
  };

  if (Array.isArray(payload.data)) {
    return {
      data: normalizeTaskList(payload.data),
      pagination: payload.pagination ?? fallbackPagination,
    };
  }

  if (Array.isArray(payload.tasks)) {
    return {
      data: normalizeTaskList(payload.tasks),
      pagination: payload.pagination ?? fallbackPagination,
    };
  }

  if (payload.data && Array.isArray(payload.data.tasks)) {
    return {
      data: normalizeTaskList(payload.data.tasks),
      pagination:
        payload.data.pagination ?? payload.pagination ?? fallbackPagination,
    };
  }

  return null;
}

function getStatusCount(tasks, status, metaKey) {
  const metaValue = tasks?.pagination?.meta?.[metaKey];
  if (typeof metaValue === "number") {
    return metaValue;
  }

  if (!Array.isArray(tasks?.data)) {
    return 0;
  }

  return tasks.data.filter((task) => {
    if (status === "inProgress") {
      return task.status === "inProgress" || task.status === "in-progress";
    }

    return task.status === status;
  }).length;
}

export default function Tasks() {
  const [searchParams] = useSearchParams();
  /* We are now able to grab the query params on this page */
  const parsedLimit = Number(searchParams.get("limit"));
  const parsedPage = Number(searchParams.get("page"));
  const queryLimit = Number.isInteger(parsedLimit) && parsedLimit > 0 ? parsedLimit : 5;
  const queryPage = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const queryOrder = searchParams.get("order") ?? "asc";
  const normalizedOrder = queryOrder === "desc" || queryOrder === "dsc" ? "dsc" : "asc";

  const { tasks, setTasks } = useContext(TasksContext);

  const { data, isError, isPending, error } = useFetchTasks({
    order: normalizedOrder,
    limit: queryLimit,
    page: queryPage,
  });

  useEffect(() => {
    if (data) {
      const normalizedTasks = normalizeTasksPayload(data);

      if (normalizedTasks) {
        setTasks(normalizedTasks);
      } else {
        console.warn("Unexpected tasks data structure:", data);
      }
    }
  }, [data]);

  // Show error state
  if (isError) {
    return (
      <section className="flex flex-col w-full p-4 gap-8 text-white">
        <h1 className="text-2xl font-bold text-red-500">Error loading tasks</h1>
        <p>{error?.message || "Unknown error occurred"}</p>
      </section>
    );
  }

  return (
    <section className="flex flex-row w-full p-4 gap-8">
      <section className="flex basis-2/3 justify-center ">
        <div className="flex flex-col w-4/5 p-4 items-center">
          <h1 className="text-white font-bold text-2xl mb-8 w-full">
            {`Tasks On, ${todaysDate()}`}
          </h1>
          {isPending && <p className="text-gray-400 text-center">Loading tasks...</p>}
          <div className="w-11/12 flex flex-col">
            <div className="flex justify-between mb-16">
              <TasksCounter
                count={getStatusCount(tasks, "todo", "todoTasks")}
                type="todo"
              />
              <TasksCounter
                count={getStatusCount(tasks, "inProgress", "inProgressTasks")}
                type="inProgress"
              />
              <TasksCounter
                count={getStatusCount(tasks, "completed", "completedTasks")}
                type="completed"
              />
            </div>

            {data && <FilterBar />}

            {!data &&
              [...Array(queryLimit)].map((entry, index) => (
                <DisplaySkeleton key={`${index}skel`} />
              ))}

            {tasks && Array.isArray(tasks.data) && tasks.data.length > 0 ? (
              tasks.data.map((task) => {
                const taskId = task?._id ?? task?.id;
                const taskDueDate = task?.dueDate ? new Date(task.dueDate) : new Date();

                return (
                  <Task
                    key={taskId}
                    dueDate={taskDueDate}
                    description={task.description}
                    status={task.status}
                    priority={task.priority}
                    title={task.title}
                    id={taskId}
                  />
                );
              })
            ) : (
              <div className="text-white text-center mt-8">No tasks found.</div>
            )}
          </div>
        </div>
      </section>
      <TaskSidebar />
    </section>
  );
}
