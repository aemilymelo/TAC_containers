const amqp = require("amqplib");
const io = require("../service/socket-server");


async function startConsumer() {
  const queue = "message.queue";
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();
  await channel.assertQueue(queue);

  channel.consume(queue, (msg) => {
    if (msg) {
      const content = msg.content.toString();
      console.log("Mensagem:", content);
      io.emit("nova-mensagem", content); // 👈 Envia pro front
      channel.ack(msg);
    }
  });
}

startConsumer();
