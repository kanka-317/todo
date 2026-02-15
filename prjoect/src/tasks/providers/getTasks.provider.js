const Task = require("../task.schema.js");
const { matchedData } = require("express-validator");
const errorLogger = require("../../helpers/errorLogger.helper.js");

function buildPageLink(baseUrl, limit, page, order) {
  return `${baseUrl}/?limit=${limit}&page=${page}&order=${order}`;
}

async function getTasksProvider(req) {
  const data = matchedData(req);

  try {
    const userId = req.user?.sub;
    const userFilter = userId ? { user: userId } : {};

    const currentPage = data.page;
    const limit = data.limit;
    const order = data.order;
    const sortOrder = order === "asc" ? 1 : -1;

    const totalTasks = await Task.countDocuments(userFilter);
    const totalPages = Math.max(1, Math.ceil(totalTasks / limit));
    const safePage = Math.min(currentPage, totalPages);
    const nextPage = safePage < totalPages ? safePage + 1 : null;
    const previousPage = safePage > 1 ? safePage - 1 : null;

    const completedTasks = await Task.countDocuments({
      ...userFilter,
      status: "completed",
    });
    const todoTasks = await Task.countDocuments({ ...userFilter, status: "todo" });
    const inProgressTasks = await Task.countDocuments({
      ...userFilter,
      status: { $in: ["inProgress", "in-progress"] },
    });

    const tasks = await Task.find(userFilter)
      .limit(limit)
      .skip((safePage - 1) * limit)
      .sort({ createdAt: sortOrder });

    const baseUrl = `${req.protocol}://${req.get("host")}${
      req.originalUrl.split("?")[0]
    }`;

    return {
      data: tasks,
      pagination: {
        meta: {
          itemsPerPage: limit,
          totalItems: totalTasks,
          currentPage: safePage,
          totalPages,
          completedTasks,
          todoTasks,
          inProgressTasks,
        },
        links: {
          first: buildPageLink(baseUrl, limit, 1, order),
          last: buildPageLink(baseUrl, limit, totalPages, order),
          current: buildPageLink(baseUrl, limit, safePage, order),
          next: nextPage ? buildPageLink(baseUrl, limit, nextPage, order) : null,
          previous: previousPage
            ? buildPageLink(baseUrl, limit, previousPage, order)
            : null,
        },
      },
    };
  } catch (error) {
    errorLogger("Error while fetching task: ", req, error);
    throw new Error(
      "Unable to process your request at the moment, please try later."
    );
  }
}

module.exports = getTasksProvider;
