const router = require('express').Router()
const serviceHistory = require('../services/history')
const { authenticated } = require('../configs/security')

router.post('/newhistory', async (req, res) => {
    try {
        req.validate()
        const created = await serviceHistory.newHistory(req.body)
        res.json(req.body)
    } catch (err) {
        res.error(err)
    }
})

router.get('/:id', [], authenticated, async(req, res) => {
    try{
        res.json(await serviceHistory.onFindByID(req.params.id))
    }catch(err){
        res.error(err)
    }
})


router.put('/:id', authenticated, async (req, res) => {
    try {
        req.validate()
        res.json({ message: await serviceHistory.onUpdate(req) })
    } catch (err) {
        res.error(err)
    }
})

router.delete('/', async (req, res) => {
    try {
        const item = await serviceHistory.findOne(req.query)
        if (!item) {
            throw new Error('Not found item.')
        } else {
            const deleteItem = await serviceHistory.onDelete(item)
            res.json(deleteItem)
        }
    } catch (err) {
        res.error(err)
    }
})


module.exports = router