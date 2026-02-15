const Task = require("../task.schema.js");
const errorLogger = require("../../helpers/errorLogger.helper.js");

async function deleteTaskProvider(req) {
  try {
    const deletedTask = await Task.deleteOne({ _id: req.body["_id"] });
    return deletedTask;
  } catch (error) {
    errorLogger("Error while deleting task: ", req, error);
    throw new Error(
      "Unable to process your request at the moment, please try later."
    );
  }
}

module.exports = deleteTaskProvider;
