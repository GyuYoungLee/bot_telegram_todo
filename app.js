require('dotenv').config()
const TelegramBot       = require('telegram-node-bot')
const TodoController    = require('./controllers/TodoController')
const OtherController   = require('./controllers/OtherwiseController')

const tgBot				= new TelegramBot.Telegram(process.env.TELEGRAM_BOT_TOKEN, { workers: 1 })
const todoController    = new TodoController()
const otherController   = new OtherController()  

tgBot.router
    .when(new TelegramBot.TextCommand('list',   'listCommand'), todoController)
    .when(new TelegramBot.TextCommand('add',    'addCommand'),  todoController)
    .when(new TelegramBot.TextCommand('done',   'doneCommand'), todoController)
    .otherwise(otherController)
