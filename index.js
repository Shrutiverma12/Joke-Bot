require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");

//Token fetched using @BotFather to create a bot
const TOKEN = process.env.BOT_TOKEN;

const bot = new TelegramBot(TOKEN, { polling: true });

bot.on("message", (msg) => {
  const text = msg.text;
  bot.sendMessage(msg.chat.id, "You said " + text);
});

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Hello! I am a bot. How can I help you?");
});

bot.onText(/\/joke/, async (msg) => {
  const joke = await axios.get(
    "https://official-joke-api.appspot.com/jokes/random"
  );

  const setup = joke.data.setup;
  const punchline = joke.data.punchline;
  bot.sendMessage(msg.chat.id, setup + " " + punchline);
});
