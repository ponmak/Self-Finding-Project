const connection = require('../configs/database')

const modelHistory = connection.model('history', {
    id: String,
    username: String,
    result: String,
    date: String,
})
module.exports = {
    findAll() {
        return new Promise((resolve, reject) => {
            modelHistory.find({}).then(result => {
                resolve(result)
            }).catch(err => reject(err))
        })
    },
    findOne() {
        return new Promise((resolve, reject) => {
            modelHistory.find({_id: id}).then(result => {
                resolve(result)
            }).catch(err => reject(err))
        })
    },
    newHistory(value) {
        return new Promise((resolve, reject) => {
            const newAccount = new modelHistory({
                id: value.id,
                username: value.username,
                result: value.password,
                date: new Date(),
            })
            newAccount.save().then(res => resolve(res)).catch(err => reject({ status: 'cannot registered' }))
        })
    },
    onDelete(id) {
        return new Promise((resolve, reject) => {
            modelHistory.deleteOne({
                _id: id
            }).then((result) => {
                resolve(result)
            }).catch((error) => {
                console.log(error)
            })
        })
    },
}