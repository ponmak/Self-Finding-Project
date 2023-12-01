const router = require('express').Router()
const { check } = require('express-validator')
const serviceAccount = require('../services/account')
const { authenticated } = require('../configs/security')

router.post('/register', [
    check('username').not().isEmpty(),
    check('password').not().isEmpty(),
], async (req, res) => {
    try {
        req.validate()
        const created = await serviceAccount.onRegister(req.body)
        res.json(req.body)
    } catch (err) {
        res.error(err)
    }
})

router.post('/login', [
    check('username').not().isEmpty(),
    check('password').not().isEmpty()
], async (req, res) => {
    try {
        req.validate()
        const created = await serviceAccount.onLogin(req.body)
        req.session.userLogin = created
        res.json(created)
    } catch (err) {
        res.error(err)
    }
})

router.post('/getUserLogin', authenticated, (req, res) => {
    try {
        res.json(req.session.userLogin)
    } catch (err) {
        res.error(err, 401)
    }
})

router.post('/logout', (req, res) => {
    try {
        delete req.session.userLogin
        res.json({ message: 'logout' })
    } catch (err) {
        res.error(err)
    }
})

router.get('/:id', [], authenticated, async(req, res) => {
    try{
        res.json(await serviceAccount.onFindByID(req.params.id))
    }catch(err){
        res.error(err)
    }
})


router.put('/:id', authenticated, async (req, res) => {
    try {
        req.validate()
        res.json({ message: await serviceAccount.onUpdate(req) })
    } catch (err) {
        res.error(err)
    }
})

router.delete('/', async (req, res) => {
    try {
        const item = await serviceAccount.findOne(req.query)
        if (!item) {
            throw new Error('Not found item.')
        } else {
            const deleteItem = await serviceAccount.onDelete(item)
            res.json(deleteItem)
        }
    } catch (err) {
        res.error(err)
    }
})


module.exports = router