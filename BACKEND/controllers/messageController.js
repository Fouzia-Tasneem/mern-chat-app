import Message from "../models/message.js";

export const getMessages = async (req, res) => {
  const { receiverId } = req.params;

  const messages = await Message.find({
    $or: [
      { senderId: req.userId, receiverId },
      { senderId: receiverId, receiverId: req.userId },
    ],
  }).sort({ createdAt: 1 });

  res.json(messages);
};
