const router = require("express").Router();
const Message = require("../models/message");

//send meesage
router.post("/", async (req, res) => {
  const message = new Message(req.body);

  try {
    const savedMessage = await message.save();
    res.status(200).json(savedMessage);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get message
router.get("/:conversationId", async (req, res) => {
  const page = +req.query.page || 1;
  const size = +req.query.size || 100;

  try {
    const total = await Message.count({
      conversationId: req.params.conversationId,
    });

    const messages = await Message.find({
      conversationId: req.params.conversationId,
    })
      .sort({ createdAt: -1 })
      .skip((page - 1) * size)
      .limit(size);

    res.status(200).json({ total, messages });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
