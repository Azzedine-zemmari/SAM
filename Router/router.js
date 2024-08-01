const router = require("express").Router();
const db = require("../Config/db");

router.get('/', (req, res) => {
    res.render('index');
});

module.exports = router;