const TelegramBot       = require('telegram-node-bot')
const ArrayService      = require('../Services/ArrayService')
const SessionService    = require('../Services/SessionService')
const arrayService      = new ArrayService()
const sessionService    = new SessionService()

module.exports = class TodoController extends TelegramBot.TelegramBaseController {

    // list
    listHandler($) {

        // 1. 내부 변수에 데이타 저장
        // arrayService.listHandler($)

        // 2. 세션에 데이타 저장
        sessionService.listHandler($)
    }


    // add 챗봇 코딩
    addHandler($) {
        const todo = $.message.text.split(' ').slice(1).join(' ')
        // 입력값이 공백이라면 todo = ''
        if(!todo) return $.sendMessage('할일을 입력해 주세요')
 
        // 1. 내부 변수에 데이타 저장
        // arrayService.addHandler($, todo)

        // 2. 세션에 데이타 저장
        sessionService.addHandler($, todo)   
    }


    // done 1
    doneHandler($) {
        const index = parseInt($.message.text.split(' ').slice(1)[0])
        // 입력값이 숫자가 아니라면 index = NaN
        if (isNaN(index)) return $.sendMessage('완료한 번호를 입력해 주세요')

        // 1. 내부 변수에 데이타 저장
        // arrayService.doneHandler($, index)

        // 2. 세션에 데이타 저장
        sessionService.doneHandler($, index)
    }

    get routes() {
        debugger
        return {
            'listCommand': 'listHandler',
            'addCommand' : 'addHandler',
            'doneCommand': 'doneHandler'
        }
    }
}