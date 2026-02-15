// // function handleGetTasks(req, res) {
// //     let response =[
// //         {
// //           "title": "Title Of the Task",
// //   "date": "2025-01-01T12:00:00Z",
// //   "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis diam vel malesuada ultricies.",
// //   "priority": "normal",
// //   "status": "todo"
// //         },
// //         {
// //              "title": "Title Of the Task 2",
// //   "date": "2025-01-01T12:00:00Z",
// //   "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis diam vel malesuada ultricies.",
// //   "priority": "normal",
// //   "status": "todo"
// //         }
// //     ]
// // //   res.send("GET tasks controller");
// //     res.status(200).json(response);
// // }

// // function handlePostTasks(req, res) {
// //   res.send("POST tasks controller");
// // }

// // function handlePatchTasks(req, res) {
// //   res.send("PATCH tasks controller");
// // }

// // function handleDeleteTasks(req, res) {
// //   res.send("DELETE tasks controller");
// // }

// // module.exports = {
// //   handleGetTasks,
// //   handlePostTasks,
// //   handlePatchTasks,
// //   handleDeleteTasks,
// // };
// const { StatusCodes, ReasonPhrases } = require("http-status-codes");

// function handleGetTasks(req, res) {
//   let response = [
//     {
//       title: "Title Of the Task",
//       date: "2025-01-01T12:00:00Z",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis diam vel malesuada ultricies.",
//       priority: "normal",
//       status: "todo",
//     },
//     {
//       title: "Title Of the Task 2",
//       date: "2025-01-01T12:00:00Z",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis diam vel malesuada ultricies.",
//       priority: "normal",
//       status: "inProgress",
//     },
//   ];

//   // //! Status should be before response
//   // res
//   //   .status(StatusCodes.OK)
//   //   .json({
//   //     status: "success",
//   //     statusCode: StatusCodes.OK,
//   //     message: ReasonPhrases.OK,
//   //     data: response,
//   //   });
   
// }

// function handlePostTasks(req, res) {
//   res.send("POST tasks controller");
// }

// function handlePatchTasks(req, res) {
//   res.send("PATCH tasks controller");
// }

// function handleDeleteTasks(req, res) {
//   res.send("DELETE tasks controller");
// }

// module.exports = {
//   handleGetTasks,
//   handlePostTasks,
//   handlePatchTasks,
//   handleDeleteTasks,
// };



// const { StatusCodes, ReasonPhrases } = require("http-status-codes");


// function handleGetTasks(req, res) {
//   let response = [
//     {
//       title: "Title Of the Task",
//       date: "2025-01-01T12:00:00Z",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis diam vel malesuada ultricies.",
//       priority: "normal",
//       status: "todo",
//     },
//     {
//       title: "Title Of the Task 2",
//       date: "2025-01-01T12:00:00Z",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis diam vel malesuada ultricies.",
//       priority: "normal",
//       status: "inProgress",
//     },
//   ];

//   //! Status should be before response
//   res.status(StatusCodes.OK).json(response);
// }

// function handlePostTasks(req, res) {
//   res.send("POST tasks controller");
// }

// function handlePatchTasks(req, res) {
//   res.send("PATCH tasks controller");
// }

// function handleDeleteTasks(req, res) {
//   res.send("DELETE tasks controller");
// }

// module.exports = {
//   handleGetTasks,
//   handlePostTasks,
//   handlePatchTasks,
//   handleDeleteTasks,
// };


// const { StatusCodes, ReasonPhrases } = require("http-status-codes");
// const Task = require("./task.schema.js");

// function handleGetTasks(req, res) {
//   let response = [
//     {
//       title: "Title Of the Task",
//       date: "2025-01-01T12:00:00Z",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis diam vel malesuada ultricies.",
//       priority: "normal",
//       status: "todo",
//     },
//     {
//       title: "Title Of the Task 2",
//       date: "2025-01-01T12:00:00Z",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis diam vel malesuada ultricies.",
//       priority: "normal",
//       status: "inProgress",
//     },
//   ];

//   //! Status should be before response
//   res.status(StatusCodes.OK).json(response);
// }

// // Convert the function to Async function
// async function handlePostTasks(req, res) {
//   try {
//     const task = new Task({
//       title: req.body.title,
//       description: req.body.description,
//       status: req.body.status,
//       priority: req.body.priority,
//       dueDate: req.body.dueDate,
//     });

//     // Insert the article in  MongoDB database
//     await task.save();

//     res.status(StatusCodes.CREATED).json(task);
//   } catch (error) {
//     res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
//   }
// }

// function handlePatchTasks(req, res) {
//   res.send("PATCH tasks controller");
// }

// function handleDeleteTasks(req, res) {
//   res.send("DELETE tasks controller");
// }

// module.exports = {
//   handleGetTasks,
//   handlePostTasks,
//   handlePatchTasks,
//   handleDeleteTasks,
// };

const { StatusCodes } = require("http-status-codes");
const createTaskProvider = require("./providers/createTask.provider.js");
const getTasksProvider = require("./providers/getTasks.provider.js");
const updateTaskProvider = require("./providers/updateTask.provider.js");
const deleteTaskProvider = require("./providers/deleteTask.provider.js");

async function handleGetTasks(req, res) {
  try {
    const tasks = await getTasksProvider(req);
    return res.status(StatusCodes.OK).json(tasks);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      reason: error.message,
    });
  }
}
// function handleGetTasks(req, res) {
//   let response = [
//     {
//       title: "Title Of the Task",
//       date: "2025-01-01T12:00:00Z",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis diam vel malesuada ultricies.",
//       priority: "normal",
//       status: "todo",
//     },
//     {
//       title: "Title Of the Task 2",
//       date: "2025-01-01T12:00:00Z",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis diam vel malesuada ultricies.",
//       priority: "normal",
//       status: "inProgress",
//     },
//   ];

//   //! Status should be before response
//   res.status(StatusCodes.OK).json(response);
// }



// Convert the function to Async function
async function handlePostTasks(req, res) {
  try {
    const task = await createTaskProvider(req);
    return res.status(StatusCodes.CREATED).json(task);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      reason: error.message,
    });
  }
}

// function handlePatchTasks(req, res) {
//   res.send("PATCH tasks controller");
// }
async function handlePatchTasks(req, res) {
  try {
    const updatedTask = await updateTaskProvider(req);
    return res.status(StatusCodes.OK).json(updatedTask);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      reason: error.message,
    });
  }
}


// function handleDeleteTasks(req, res) {
//   res.send("DELETE tasks controller");
// }
async function handleDeleteTasks(req, res) {
  try {
    const deleteTask = await deleteTaskProvider(req);
    return res.status(StatusCodes.OK).json(deleteTask);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      reason: error.message,
    });
  }
}


module.exports = {
  handleGetTasks,
  handlePostTasks,
  handlePatchTasks,
  handleDeleteTasks,
};
