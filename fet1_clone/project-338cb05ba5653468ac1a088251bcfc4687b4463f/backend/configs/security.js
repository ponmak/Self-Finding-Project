const crypto = require('crypto')
const security = {
    password_hash(password) {
        return crypto.createHash('sha1').update(password).digest('hex');
    },
    password_verify(password, password_hash) {
        return security.password_hash(password) === password_hash
    },
    authenticated(req, res, next) {
        try {
            if (req.session.user) {
                return next()
            }
            throw new Error('User unautherize.')

        } catch (ex) {
            res.error(ex, 401)
        }
    },
    isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }
}
module.exports = security