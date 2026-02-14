import User from "../models/user.js";

export const getUsers = async (req, res) => {
  const users = await User.find({ _id: { $ne: req.userId } }).select(
    "-password",
  );
  res.json(users);
};
