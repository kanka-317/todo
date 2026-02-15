// const Task = require("../task.schema.js");

// async function updateTaskProvider(req, res) {
//   // Find the task first
//   /**
//    * Notice that we use the exec() Mongoose function. This is technically optional and returns a promise. In my experience, it’s better to use this function since it will prevent some head-scratching issues. If you want to read more about it, check out this note in the Mongoose docs about
//    * promises
//    * .
//    */
//   const task = await Task.findById(req.params.id);

//   //  Update the task
//   task.title = req.body.title;
//   task.description = req.body.description;
//   task.dueDate = req.body.dueDate;
//   task.priority = req.body.priority;
//   task.status = req.body.status;

//   // Save it
//   return await task.save();
// }

// module.exports = updateTaskProvider;
const Task = require("../task.schema.js");
const { matchedData } = require("express-validator");
const errorLogger = require("../../helpers/errorLogger.helper.js");

async function updateTaskProvider(req) {
  const validatedData = matchedData(req);

  try {
    const task = await Task.findById(req.body["_id"]).exec();

    //  Update the task
    task.title = validatedData.title || task.title;
    task.description = validatedData.description || task.description;
    task.dueDate = validatedData.dueDate || task.dueDate;
    task.priority = validatedData.priority || task.priority;
    task.status = validatedData.status || task.status;

    // Save it
    await task.save();
    return task;
  } catch (error) {
    errorLogger("Error while updating task: ", req, error);
    throw new Error(
      "Unable to process your request at the moment, please try later."
    );
  }
}

module.exports = updateTaskProvider;
