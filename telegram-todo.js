const TelegramBot       = require('telegram-node-bot')
const { BotFactory, BotType } = require('./factories/BotFactory')
const TodoController    = require('./controllers/TodoController')
const OtherController   = require('./controllers/OtherwiseController')

const tgBot             = BotFactory.getBot(BotType.TELEGRAM)
const todoController    = new TodoController()
const otherController   = new OtherController()  

tgBot.router
    .when(new TelegramBot.TextCommand('list',   'listCommand'), todoController)
    .when(new TelegramBot.TextCommand('List',   'listCommand'), todoController)
    .when(new TelegramBot.TextCommand('add',    'addCommand'),  todoController)
    .when(new TelegramBot.TextCommand('Add',    'addCommand'),  todoController)
    .when(new TelegramBot.TextCommand('done',   'doneCommand'), todoController)
    .when(new TelegramBot.TextCommand('Done',   'doneCommand'), todoController)    
    .otherwise(otherController)
