const TelegramBot = require('telegram-node-bot')

module.exports = class OtherwiseController extends TelegramBot.TelegramBaseController {
    handle($) {
        $.sendMessage(`제가 할 수 없는 일입니다.
list                  
add    <할일>
done <목록 번호>      
`)
    }
}