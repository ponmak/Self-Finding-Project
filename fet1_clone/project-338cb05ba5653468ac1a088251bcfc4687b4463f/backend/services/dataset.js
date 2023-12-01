const connection = require('../configs/database')

const modelDataset = connection.model('dataset', {
    mbti: String,
    iq: String,
    eq: String,
    faculty: String
})
module.exports = {
    findAll() {
        return new Promise((resolve, reject) => {
            modelDataset.find({}).then(result => {
                resolve(result)
            }).catch(err => reject(err))
        })
    },
    findOne() {
        return new Promise((resolve, reject) => {
            modelDataset.find({ _id: id }).then(result => {
                resolve(result)
            }).catch(err => reject(err))
        })
    },
    newData(value) {
        return new Promise((resolve, reject) => {
            const newAccount = new modelDataset({
                mbti: value.mbti,
                iq: value.iq,
                eq: value.eq,
                faculty: value.faculty,
            })
            newAccount.save().then(res => resolve(res)).catch(err => reject({ status: 'cannot registered' }))
        })
    },
    onUpdate(value) {
        return new Promise((resolve, reject) => {
            var conditions = { id: value._id }
                , update = {
                    mbti: value.mbti,
                    iq: value.iq,
                    eq: value.eq,
                    faculty: value.faculty,
                },
                options = { multi: true };
            modelDataset.updateOne(conditions, update, options).then(result => {
                resolve(result)
            }).catch(err => reject(err))
        })
    },
    onDelete(id) {
        return new Promise((resolve, reject) => {
            modelDataset.deleteOne({
                _id: id
            }).then((result) => {
                resolve(result)
            }).catch((error) => {
                console.log(error)
            })
        })
    },
}