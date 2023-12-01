const router = require('express').Router()
const { check } = require('express-validator')
const serviceDataset = require('../services/dataset')
const { authenticated } = require('../configs/security')

router.post('/newdataset', async (req, res) => {
    try {
        req.validate()
        const created = await serviceDataset.newData(req.body)
        res.json(req.body)
    } catch (err) {
        res.error(err)
    }
})

router.get('/', [], async (req, res) => {
    try {

        const datares = await serviceDataset.findAll()
        res.json(datares)
        // console.log(res);
    } catch (err) {
        res.error(err)
    }
})

router.get('/faculty', [], async (req, res) => {
    try {

        const faculties = await serviceDataset.findAll()
        // console.log(faculties);
        const finalist = faculties.map(obj => obj.faculty);
        // console.log(finalist);

        res.json([...new Set(finalist)])
        // console.log(res);
    } catch (err) {
        res.error(err)
    }
})




router.post('/processFilter', [], async (req, res) => {
    try {
        const datares = processFunction(await serviceDataset.findAll(), req.body)
        res.json(datares)
        // res.json()
        // console.log(res);
    } catch (err) {
        res.error(err)
    }
})

router.get('/:id', [], authenticated, async (req, res) => {
    try {
        res.json(await serviceDataset.onFindByID(req.params.id))
    } catch (err) {
        res.error(err)
    }
})


router.put('/:id', authenticated, async (req, res) => {
    try {
        req.validate()
        res.json({ message: await serviceDataset.onUpdate(req) })
    } catch (err) {
        res.error(err)
    }
})

router.delete('/', async (req, res) => {
    try {
        const item = await serviceDataset.findOne(req.query)
        if (!item) {
            throw new Error('Not found item.')
        } else {
            const deleteItem = await serviceDataset.onDelete(item)
            res.json(deleteItem)
        }
    } catch (err) {
        res.error(err)
    }
})

function processFunction(data, body) {
    let responeJson = {
        mbti: [],
        iq: [],
        eq: [],
        final: [],
    }
    let facultyBymbti = []
    let facultyByiq = []
    let facultyByeq = []
    let resBymbti = []
    let resByiq = []
    let resByeq = []

    facultyBymbti = data.filter(item => item.mbti == body.mbti)
    facultyByiq = data.filter(item => parseInt(item.iq) > (body.iq-5) && parseInt(item.iq) < (body.iq+5))
    facultyByeq = data.filter(item => item.eq == body.eq)


    resBymbti = facultyBymbti.reduce(
        (acc, item) => ({
            ...acc,
            [item.faculty]: acc[item.faculty]
                ? acc[item.faculty] + 1
                : 1
        }),
        {}
    )
    resByiq = facultyByiq.reduce(
        (acc, item) => ({
            ...acc,
            [item.faculty]: acc[item.faculty]
                ? acc[item.faculty] + 1
                : 1
        }),
        {}
    )
    resByeq = facultyByeq.reduce(
        (acc, item) => ({
            ...acc,
            [item.faculty]: acc[item.faculty]
                ? acc[item.faculty] + 1
                : 1
        }),
        {}
    )


    const sortmbti = Object.fromEntries(
        Object.entries(resBymbti).sort(([, a], [, b]) => b - a)
    );
    const sortiq = Object.fromEntries(
        Object.entries(resByiq).sort(([, a], [, b]) => b - a)
    );
    const sorteq = Object.fromEntries(
        Object.entries(resByeq).sort(([, a], [, b]) => b - a)
    );

    for (var i = 0; i < 3; i++) {
        responeJson.mbti.push({ faculty: Object.keys(sortmbti)[i], percent: (Object.values(sortmbti)[i] * 100 / facultyBymbti.length).toFixed(2) })
        responeJson.iq.push({ faculty: Object.keys(sortiq)[i], percent: (Object.values(sortiq)[i] * 100 / facultyByiq.length).toFixed(2) })
        responeJson.eq.push({ faculty: Object.keys(sorteq)[i], percent: (Object.values(sorteq)[i] * 100 / facultyByeq.length).toFixed(2) })
    }

    let final = [...responeJson.mbti, ...responeJson.iq, ...responeJson.eq];
    let resfinal = final.map(obj => obj.faculty).reduce(
        (acc, item) => ({
            ...acc,
            [item]: acc[item]
                ? acc[item] + 1
                : 1
        }),
        {}
    )

    const sortfinal = Object.fromEntries(
        Object.entries(resfinal).sort(([, a], [, b]) => b - a)
    );

    for (var i = 0; i < 3; i++) {
        responeJson.final.push({ faculty: Object.keys(sortfinal)[i], percent: (Object.values(sortfinal)[i] * 100 / final.length).toFixed(2) })
    }

    return facultyByiq.length;
}

module.exports = router