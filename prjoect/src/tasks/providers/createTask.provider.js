// const Task = require("../task.schema.js");

// async function createTaskProvider(req, res) {
//   const task = new Task({
//     title: req.body.title,
//     description: req.body.description,
//     status: req.body.status,
//     priority: req.body.priority,
//     dueDate: req.body.dueDate,
//   });

//   // Insert the article in  MongoDB database
//   return await task.save();
// }

// module.exports = createTaskProvider;

// const Task = require("../task.schema.js");
// const { matchedData } = require("express-validator");

// async function createTaskProvider(req, res) {
//   const validatedData = matchedData(req);
//   //! matchedData(req) will get the validated and sanitized data and remove extra and unwanted fields from the incoming request as well.
//   console.log(validatedData);
//   const task = new Task(validatedData);

//   // Insert the article in  MongoDB database
//   return await task.save();
// }

// // module.exports = createTaskProvider;
// const Task = require("../task.schema.js");
// const { matchedData } = require("express-validator");
// const { StatusCodes } = require("http-status-codes");


// async function createTaskProvider(req, res) {
//   const validatedData = matchedData(req);
//   const task = new Task(validatedData);
//   try {
//     // Insert the article in  MongoDB database
//     await task.save();
//     return task;
//   } catch (error) {
//     //! The error object might contain debugging information and you might want to add this to server logs but not required to be shared with the end user of the application.
//     //! Opportunity to create a log of errors
//     console.log(error);
//     throw new Error("Unable to process your request at the moment, please try later.");
//   }
// }

// // module.exports = createTaskProvider;
// const Task = require("../task.schema.js");
// const { matchedData } = require("express-validator");
// const { StatusCodes } = require("http-status-codes");
// const logger = require("../../helpers/winston.helper.js");

// async function createTaskProvider(req) {
//   const validatedData = matchedData(req);
//   const task = new Task(validatedData);
//   try {
//     // Insert the article in  MongoDB database
//     await task.save();
//     return task;
//   } catch (error) {
//     console.log(error.code);
//     console.log(req.body);
//     logger.error(`Error while creating task: ${error.message}`, {
//       // Manually log the error
//       metadata: {
//         // You can add additional metadata if necessary
//         //  These are logged to the error.log
//         statusCode: error.code,
//         errorName: error.name,
//         method: req.method,
//         url: req.originalUrl,
//         body: req.body,
//         error: error,
//       },
//     });
//     throw new Error("Unable to process your request at the moment, please try later.");
//   }
// }

// module.exports = createTaskProvider;

// const Task = require("../task.schema.js");
// const { matchedData } = require("express-validator");
// const { StatusCodes } = require("http-status-codes");
// const errorLogger = require("../../helpers/errorLogger.helper.js");

// async function createTaskProvider(req, res) {
//   const validatedData = matchedData(req);
//   const task = new Task(validatedData);
//   try {
//     // Insert the article in  MongoDB database
//     await task.save();
//     return res.status(StatusCodes.CREATED).json(task);
//   } catch (error) {
//     errorLogger("Error while creating task: ", req, error);
//     return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
//       reason: "Unable to process your request at the moment, please try later.",
//     });
//   }
// }

// module.exports = createTaskProvider;

// const Task = require("../task.schema.js");
// const { matchedData } = require("express-validator");
// const { StatusCodes } = require("http-status-codes");
// const errorLogger = require("../../helpers/errorLogger.helper.js");

// async function createTaskProvider(req, res) {
//   const validatedData = matchedData(req);

//   console.log(req.user);

//   const task = new Task(validatedData);
//   try {
//     // Insert the article in  MongoDB database
//     await task.save();
//     return res.status(StatusCodes.CREATED).json(task);
//   } catch (error) {
//     errorLogger("Error while creating task: ", req, error);
//     return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
//       reason: "Unable to process your request at the moment, please try later.",
//     });
//   }
// }

// module.exports = createTaskProvider;

const Task = require("../task.schema.js");
const { matchedData } = require("express-validator");
const errorLogger = require("../../helpers/errorLogger.helper.js");

async function createTaskProvider(req) {
  const validatedData = matchedData(req);

    const task = new Task({ ...validatedData, user: req.user.sub });
  try {
    // Insert the article in  MongoDB database
    await task.save();
    return task;
  } catch (error) {
    errorLogger("Error while creating task: ", req, error);
    throw new Error(
      "Unable to process your request at the moment, please try later."
    );
  }
}

module.exports = createTaskProvider;
