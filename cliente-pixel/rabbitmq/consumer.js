const amqp = require('amqplib');

async function startConsumer() {
  const queue = 'message.queue';

  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue(queue);
    console.log(`[✓] Aguardando mensagens na fila: ${queue}`);

    channel.consume(queue, (msg) => {
      if (msg !== null) {
        console.log(`[→] Mensagem recebida: ${msg.content.toString()}`);
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error('[✗] Erro ao conectar ao RabbitMQ:', error);
  }
}

startConsumer();
