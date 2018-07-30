const TelegramBot = require('telegram-node-bot')

const todos = []

module.exports = class TodoController extends TelegramBot.TelegramBaseController {
    listHandler($) {
        $.sendMessage(this.parseTodos(todos), { parse_mode: 'Markdown'})
        console.log(`listHandler - todos: ${JSON.stringify(todos)}`)
    }

    addHandler($) {
        const todo = $.message.text.split(' ').slice(1).join(' ')
        // 입력값이 공백이라면 todo = ''
        if(!todo) return $.sendMessage('todo를 입력해 주세요')

        todos.push(todo)
        $.sendMessage(`[${todo}] 할일에 추가 되었습니다`)
        console.log(`addHandler - todos: ${JSON.stringify(todos)}`)
        this.listHandler($)
    }

    doneHandler($) {
        const index = parseInt($.message.text.split(' ').slice(1)[0])
        // 입력값이 숫자가 아니라면 index = NaN
        if (isNaN(index)) return $.sendMessage('완료한 목록의 번호를 입력해 주세요')
        
        todos.splice(index, 1)
        $.sendMessage('완료처리 되었습니다')
        console.log(`doneHandler - todos: ${JSON.stringify(todos)}`)
        this.listHandler($)
    }

    parseTodos(todos) {
        // 데이타가 없다면
        if(!todos.length) return '등록된 할일이 없습니다' 

        let msg = '* 할일 목록 * \n'
        todos.forEach((todo, i) => {
          msg += `* ${i} * - ${todo}\n`
        })
        return msg
    }

    get routes() {
        return {
            'listCommand': 'listHandler',
            'addCommand' : 'addHandler',
            'doneCommand': 'doneHandler'
        }
    }
}