const { StatusCodes } = require("http-status-codes");
const createUserProvider = require("./providers/createUser.provider.js");

async function handleCreateUser(req, res) {
  try {
    const user = await createUserProvider(req);
    res.status(StatusCodes.CREATED).json(user);
  } catch (error) {
    // Handle duplicate email or other MongoDB errors
    if (error.code === 11000) {
      return res.status(StatusCodes.CONFLICT).json({
        reason: "Email already exists. Please use a different email.",
      });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      reason: "Unable to process your request at the moment, please try later.",
    });
  }
}

module.exports = {
  handleCreateUser,
};
