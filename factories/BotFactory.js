require('dotenv').config()
const TelegramBot = require('telegram-node-bot')

let tgBot

const BotType = {
    TELEGRAM: 'telegram'
}

class BotFactory {
    static getBot(type) {
        let bot
        switch (type) {
            case BotType.TELEGRAM:
                if(tgBot) {
                    bot = tgBot            
                } else {
                    tgBot = new TelegramBot.Telegram(process.env.TELEGRAM_BOT_TOKEN, { workers: 1 })
                    bot = tgBot
                }
                break
            default:
                throw new Error('not supported bot')
        }
        return bot     
    }
}

module.exports = { BotFactory, BotType }