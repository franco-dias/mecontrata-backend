import Message from '../schemas/Message';

class MessageVisualizationController {
  async update(req, res) {
    const { userId: sender } = req;
    const { recipient, ad } = req.query;

    await Message.updateMany(
      {
        recipient,
        ad,
        seen: false,
        sender: {
          $ne: sender,
        },
      },
      {
        $set: {
          seen: true,
        },
      },
    );
    return res.status(200).json({ message: 'Mensagens marcadas como lidas.' });
  }
}

export default new MessageVisualizationController();
