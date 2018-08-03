const firebaseIdTable = []
class Util {
    static parseTodos(todos) {
        // 데이타가 없다면 todos = {}, todos = []
        if(!Array.isArray(todos) || !todos.length) return '할일이 없습니다' 

        let msg = '* 할일 목록 * \n'
        let desc 
        todos.forEach((todo, i) => {
            firebaseIdTable[i+1] = todo.id
            desc = todo.desc || todo
            msg += `* ${i+1} * - ${desc}\n`
        })
        return msg
    }
}

module.exports = { Util, firebaseIdTable }