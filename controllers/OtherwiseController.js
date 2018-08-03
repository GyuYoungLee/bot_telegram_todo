const TelegramBot = require('telegram-node-bot')

module.exports = class OtherwiseController extends TelegramBot.TelegramBaseController {
    handle($) {
        $.sendMessage(`list                  
add    <할일>
done <목록 번호>      
`)
    }
}
