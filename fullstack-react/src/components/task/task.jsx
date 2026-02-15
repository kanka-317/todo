 
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import PropTypes from "prop-types";
import { Switch } from "@/components/ui/switch";
import { useUpdateTask } from "@/hooks/useUpdateTask.hook.js";

export function Task(props) {
  const {
    title = "This is a default title",
    description = "Description of the task",
    status = "todo",
    priority = "normal",
    dueDate,
    id,
  } = props;

  const [progress, setProgress] = useState(false);
  const { mutate } = useUpdateTask();

  // Use toLocaleDateString with options for day, month, and year
  let formattedDate = dueDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  useEffect(() => {
    if (status === "inProgress") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProgress(true);
    }
  }, [status]);

  function handleProgressChange(value) {
    setProgress(value);
    mutate(
      { _id: id, status: value ? "inProgress" : "todo" },
      {
        onError: () => {
          setProgress((prev) => !prev);
        },
      }
    );
  }

  function handleTaskCompleted() {
    mutate({ _id: id, status: "completed" });
  }

  return (
    <Card className="w-full mb-8">
      <CardHeader className="flex flex-row justify-between">
        <CardTitle className="basis-2/3 leading-8">{title}</CardTitle>
        <div>
          <Badge className="mr-2" variant="outline">
            {formattedDate}
          </Badge>
          {priority === "normal" && (
            <Badge className="bg-sky-800" variant="outline">
              {priority}
            </Badge>
          )}
          {priority === "high" && (
            <Badge className="bg-red-800" variant="outline">
              {priority}
            </Badge>
          )}
          {priority === "low" && (
            <Badge className="bg-green-800" variant="outline">
              {priority}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex flex-row items-center">
          <Switch
            checked={progress}
            onCheckedChange={handleProgressChange}
            id={`in-progress-${id}`}
          />
          <Label className="ml-4" htmlFor={`in-progress-${id}`}>
            In Progress
          </Label>
        </div>
        <Button onClick={handleTaskCompleted}>Completed</Button>
      </CardFooter>
    </Card>
  );
}

Task.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  status: PropTypes.oneOf(["todo", "inProgress", "completed"]),
  priority: PropTypes.oneOf(["low", "normal", "high"]),
  dueDate: PropTypes.instanceOf(Date).isRequired,
};
