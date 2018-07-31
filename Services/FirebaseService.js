const CloudStorage              = require('../db/Cloudstorage')
const { Util, firebaseIdTable } = require('../Utils/Util')

module.exports = class FirebaseService {
    listHandler($) {
        CloudStorage.getTodos()
            .then(todos => {
                $.sendMessage(Util.parseTodos(todos), { parse_mode: 'Markdown'})
                console.log(`ArrayService.listHandler - todos: ${JSON.stringify(todos)}`)
            })
            .catch(err => $.sendMessage(err.message)) 
    }

    addHandler($, todo) {
        CloudStorage.insertTodo( { desc: todo } )
            .then(todos => {
                $.sendMessage(`[${todo}] 할일에 추가 되었습니다`)
                console.log(`ArrayService.addHandler - todos: ${JSON.stringify(todos)}`)
                this.listHandler($)
            })
            .catch(err => $.sendMessage(err.message))    
    }

    doneHandler($, index) {
        CloudStorage.deleteTodo(firebaseIdTable[index])
            .then(todos => {
                $.sendMessage('완료처리 되었습니다')
                console.log(`ArrayService.doneHandler - todos: ${JSON.stringify(todos)}`)
                this.listHandler($)
            })
            .catch(err => $.sendMessage(err.message)) 
    }
} 