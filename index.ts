import { NewMessage } from "telegram/events";
import { client } from "./telegram-user-client";

await client.connect();

const chatsToShareQuiz = ["-1001636657485", "-1002139558571"];

client.addEventHandler(async (event) => {
  if (!event.message.chatId || !event.message.fromId) return;

  const messageId = event.message.id;
  const chatId = event.message.chatId?.toString();
  // @ts-expect-error
  const userId = parseInt(event.message.fromId?.userId.toString());

  if (userId === 983000232) {
    const chatsToFowardThisQuiz = chatsToShareQuiz.filter((c) => c !== chatId);
    for (const chat of chatsToFowardThisQuiz) {
      console.log(chat, chatId, messageId);
      await client.forwardMessages(chat, {
        messages: messageId,
        fromPeer: chatId,
      });
    }
  }
  1;
}, new NewMessage({ chats: chatsToShareQuiz, forwards: false }));
