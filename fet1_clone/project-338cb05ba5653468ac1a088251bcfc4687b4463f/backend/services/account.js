const connection = require('../configs/database')
const { password_hash, isEmpty } = require('../configs/security')
var crypto = require("crypto");

const modelAccount = connection.model('account', {
    id: String,
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    date: String,
})
module.exports = {
    findAll() {
        return new Promise((resolve, reject) => {
            modelAccount.find({}).then(result => {
                resolve(result)
            }).catch(err => reject(err))
        })
    },
    findOne() {
        return new Promise((resolve, reject) => {
            modelAccount.find({_id: id}).then(result => {
                resolve(result)
            }).catch(err => reject(err))
        })
    },
    onRegister(value) {
        return new Promise((resolve, reject) => {
            const newAccount = new modelAccount({
                id: crypto.randomBytes(20).toString('hex'),
                username: value.username,
                password: value.password,
                firstname: value.firstname,
                lastname: value.lastname,
                date: new Date(),
            })
            newAccount.save().then(res => resolve(res)).catch(err => reject({ status: 'cannot registered' }))
        })
    },
    onLogin(value) {
        console.log(value);
        return new Promise((resolve, reject) => {
            modelAccount.find({ username: value.username, password: value.password }).select('username').exec(function (error, res) {
                if (error) {
                    reject(error)
                } else {
                    if (isEmpty(res)) {
                        resolve({ message: 'Authen fail' })
                    } else {
                        resolve(res[0])
                    }
                }
            })
        })
    },
    onUpdate(value) {
        return new Promise((resolve, reject) => {
            var conditions = { id: value.id }
                , update = {
                    email: value.email,
                    password: value.password,
                    firstname: value.firstname,
                    lastname: value.lastname,
                },
                options = { multi: true };
            modelAccount.updateOne(conditions, update, options).then(result => {
                resolve(result)
            }).catch(err => reject(err))
        })
    },
    onDelete(id) {
        return new Promise((resolve, reject) => {
            modelAccount.deleteOne({
                _id: id
            }).then((result) => {
                resolve(result)
            }).catch((error) => {
                console.log(error)
            })
        })
    },
}