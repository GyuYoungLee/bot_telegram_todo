require('dotenv').config()
const admin             = require("firebase-admin");
const serviceAccount    = require(process.env.FIREBASE_KEY_FILE);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL
});

const db = admin.firestore()
const dbRef = db.collection('simpleTodos')

module.exports = class CloudeStorage {
    static getTodos() {
        return dbRef.get()
                .then(results => {
                    const todos = []
                    if (!results || !results.size) return todos
                    
                    results.forEach(doc =>
                        todos.push(Object.assign({ id: doc.id }, doc.data()))
                    )
                    return todos
                })
                .catch(err => {
                throw new Error('error occured when get todos')
                })
    }

    static insertTodo(data) {
        return dbRef.add(data)
                .then(result => {
                    return this.getTodos()
                })
                .catch(err => {
                    throw new Error('error occured when insert')
                })
    }

    static deleteTodo(key) {
        return dbRef.doc(key).delete()
                .then(result => {
                    return this.getTodos()
                })
                .catch(err => {
                    throw new Error('error occured when delete')
                })
    }
}