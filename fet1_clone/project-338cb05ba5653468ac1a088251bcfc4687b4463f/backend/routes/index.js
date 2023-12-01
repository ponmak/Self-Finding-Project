const router = require('express').Router()
const { authenticated } = require('../configs/security')

const account = require('./account')
const dataset = require('./dataset')
const history = require('./history')

router.use('/_swk/account', account); 
router.use('/_swk/dataset', dataset); 
router.use('/_swk/history', history); 

module.exports = router;
