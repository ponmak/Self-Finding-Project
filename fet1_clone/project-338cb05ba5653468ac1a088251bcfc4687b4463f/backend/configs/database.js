const mongoose = require('mongoose')
let db = 'mongodb+srv://swkproject:root-admin@cluster0.oi7lfkx.mongodb.net/project?retryWrites=true'
mongoose.connect(db, {
    useUnifiedTopology: true, useNewUrlParser: true
}).then(() =>
    console.log('DB Connected!')
).catch(err => {
    console.log(`DB Connection Error: ${err.message}`)
})
module.exports = mongoose
