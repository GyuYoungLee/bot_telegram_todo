const TelegramBot = require('telegram-node-bot')

// 1. 내부 변수에 데이타 저장
// const todos = []

module.exports = class TodoController extends TelegramBot.TelegramBaseController {
    listHandler($) {

        // 1. 내부 변수에 데이타 저장
        // $.sendMessage(this.parseTodos(todos), { parse_mode: 'Markdown'})
        // console.log(`listHandler - todos: ${JSON.stringify(todos)}`)
        // -----------------

        // 2. 세션에 데이타 저장
        $.getUserSession('todos')
            .then(todos => {
                $.sendMessage(this.parseTodos(todos), { parse_mode: 'Markdown'})
                console.log(`listHandler - todos: ${JSON.stringify(todos)}`)
            })
        // -----------------                
    }

    addHandler($) {
        const todo = $.message.text.split(' ').slice(1).join(' ')
        // 입력값이 공백이라면 todo = ''
        if(!todo) return $.sendMessage('todo를 입력해 주세요')

        // 1. 내부 변수에 데이타 저장
        // todos.push(todo)
        // $.sendMessage(`[${todo}] 할일에 추가 되었습니다`)
        // console.log(`addHandler - todos: ${JSON.stringify(todos)}`)
        // this.listHandler($)
        // -----------------    

        // 2. 세션에 데이타 저장
        $.getUserSession('todos')
            .then(todos => {
                let newTodos
                if (!Array.isArray(todos)) { // 데이타가 없다면
                    newTodos = [todo]
                    $.setUserSession('todos', newTodos)
                } else { 
                    newTodos = todos.concat([todo])
                    $.setUserSession('todos', newTodos) 
                }
                console.log(`addHandler - todos: ${JSON.stringify(newTodos)}`)
                $.sendMessage(`[${todo}] 할일에 추가 되었습니다`)
                this.listHandler($)    
            })
        // -----------------        
    }

    doneHandler($) {
        const index = parseInt($.message.text.split(' ').slice(1)[0])
        // 입력값이 숫자가 아니라면 index = NaN
        if (isNaN(index)) return $.sendMessage('완료한 번호를 입력해 주세요')
        
        // 1. 내부 변수에 데이타 저장
        // todos.splice(index, 1)
        // $.sendMessage('완료처리 되었습니다')
        // console.log(`doneHandler - todos: ${JSON.stringify(todos)}`)
        // this.listHandler($)

        // 2. 세션에 데이타 저장
        $.getUserSession('todos')
            .then(todos => {
                todos.splice(index, 1)
                $.setUserSession('todos', todos) 
                $.sendMessage('완료처리 되었습니다')
                console.log(`doneHandler - todos: ${JSON.stringify(todos)}`)
                this.listHandler($)
            })
        // -----------------            
    }

    parseTodos(todos) {
        // 데이타가 없다면 todos = {}, todos = []
        if(!Array.isArray(todos) || !todos.length) return '할일이 없습니다' 

        let msg = '* 할일 목록 * \n'
        todos.forEach((todo, i) => {
          msg += `* ${i} * - ${todo}\n`
        })
        return msg
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