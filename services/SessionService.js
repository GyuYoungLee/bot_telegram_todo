const { Util } = require('../utils/Util')

module.exports = class SessionService {
    listHandler($) {
        $.getUserSession('todos')
            .then(todos => {
                $.sendMessage(Util.parseTodos(todos), { parse_mode: 'Markdown'})
                console.log(`SessionService.listHandler - todos: ${JSON.stringify(todos)}`)
            })
    }

    addHandler($, todo) {
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
                $.sendMessage(`[${todo}] 추가 되었습니다`)
                console.log(`SessionService.addHandler - todos: ${JSON.stringify(newTodos)}`)
                this.listHandler($)    
            })
    }

    doneHandler($, index) {
        $.getUserSession('todos')
            .then(todos => {
                todos.splice(index, 1)
                $.setUserSession('todos', todos) 
                $.sendMessage('완료처리 되었습니다')
                console.log(`SessionService.doneHandler - todos: ${JSON.stringify(todos)}`)
                this.listHandler($)
            })
    }
} 