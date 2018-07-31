module.exports = class Util {
    static parseTodos(todos) {
        // 데이타가 없다면 todos = {}, todos = []
        if(!Array.isArray(todos) || !todos.length) return '할일이 없습니다' 

        let msg = '* 할일 목록 * \n'
        todos.forEach((todo, i) => {
          msg += `* ${i} * - ${todo}\n`
        })
        return msg
    }
}