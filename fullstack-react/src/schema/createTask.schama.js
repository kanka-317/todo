import { z } from "zod";

export const CreateTaskSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Task title is required" })
    .max(100, { message: "The title must be at most 100 characters long" }),
  dueDate: z.date({
    required_error: "Task due date is required.",
  }),
  description: z
    .string()
    .min(1, { message: "Task description is required" })
    .max(500, {
      message: "The description cannot be more than 500 characters.",
    }),
  status: z.enum(["todo", "inProgress", "completed"], {
    message: "Please select a status",
  }),
  priority: z.enum(["low", "normal", "high"], {
    message: "Please select the priority",
  }),
});
