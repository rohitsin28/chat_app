import Chat from "../../models/chatModels.js";
import User from "../../models/userModel.js";

const chatController = {
  accessChat: async (req, res) => {
    const { userId } = req.body;

    if (!userId) return res.status(400).json({ message: "UserId is required" });

    let isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    // Ensure latestMessage sender is populated
    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name pic email",
    });

    if (isChat.length > 0) return res.json(isChat[0]);

    // Creating a new chat if it doesn’t exist
    const chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const fullChat = await Chat.findById(createdChat._id).populate(
        "users",
        "-password"
      );

      return res.status(201).json(fullChat);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to create chat", error: error.message });
    }
  },

  fetchChat: async (req, res) => {
    try {
      const chats = await Chat.find({
        users: { $elemMatch: { $eq: req.user.id } },
      })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        .populate("latestMessage");
  
      const isChat = await User.populate(chats, {
        path: "latestMessage.sender",
        select: "name pic email",
      });
      return res.status(200).json({message: "Success", isChat});
    } catch (error) {
      return res.status(500).json({message: "Something went wrong", error: error.message});
    }
  },

  createGroupChat: async (req, res) => {
    try {
      const { groupName, users } = req.body;

      if (!Array.isArray(users) || !groupName)
        return res.status(400).json({ message: "Invalid request body" });

      if (users.length < 2)
        return res
          .status(400)
          .json({
            message: "At least two users are required to create a group chat",
          });

      users.push(req.user.id);

      const groupChat = await Chat.create({
        chatName: groupName,
        isGroupChat: true,
        users,
        groupAdmin: req.user.id,
      });

      const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

      return res.status(201).json(fullGroupChat);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong", error: error.message });
    }
  },

  renameGroup: async (req, res) => {
    try {
      const { chatId, groupName } = req.body;
      if (!groupName)
        return res.status(400).json({ message: "Please provide a new group name" });
      
      await Chat.findByIdAndUpdate(
        chatId, { chatName: groupName }, { new: true } );

      return res.status(200).json({ message: "success" });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
  },

  removeFromGroup: async(req,res) => {
    try {
      const { chatId, userId } = req.body;
      if (!chatId ||!userId)
        return res.status(400).json({ message: "Invalid request body" });
      
      const removed = await Chat.findByIdAndUpdate(
        chatId,
        { $pull: { users: userId } },
        { new: true }
      )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

      if(!removed){
        return res.status(404).json({ message: "Chat not found" });
      } else {
        return res.status(200).json({ message: "User removed successfully",removed });
      }
    } catch (error) {
      return res.status(500).json({message: "Error removing group", error: error.message});
    }
  },

  addFromGroup: async(req,res) => {
    try {
      const { chatId, userId } = req.body;

      if (!chatId ||!userId)
        return res.status(400).json({ message: "Invalid request body" });
      
      const added = await Chat.findByIdAndUpdate(
        chatId,
        { $push: { users: userId } },
        { new: true }
      )
     .populate("users", "-password")
     .populate("groupAdmin", "-password");
      
      if(!added)
        return res.status(404).json({ message: "Chat not found" });
      else
        return res.status(200).json({ message: "User added successfully", added });
    } catch (error) {
      return res.status(500).send({message: "Something went wrong", error: error.message});
    }
  }
};

export default chatController;
