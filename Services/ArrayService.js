const { Util } = require('../Utils/Util')

// 1. 내부 변수에 데이타 저장
const todos = []

module.exports = class ArrayService {
    listHandler($) {
        $.sendMessage(Util.parseTodos(todos), { parse_mode: 'Markdown'})
        console.log(`ArrayService.listHandler - todos: ${JSON.stringify(todos)}`)
    }

    addHandler($, todo) {
        todos.push(todo)
        $.sendMessage(`[${todo}] 할일에 추가 되었습니다`)
        console.log(`ArrayService.addHandler - todos: ${JSON.stringify(todos)}`)
        this.listHandler($)
    }

    doneHandler($, index) {
        todos.splice(index, 1)
        $.sendMessage('완료처리 되었습니다')
        console.log(`ArrayService.doneHandler - todos: ${JSON.stringify(todos)}`)
        this.listHandler($)
    }
} 