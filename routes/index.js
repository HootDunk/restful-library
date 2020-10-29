// The index route is the code for when we don't have a resource or model in our url

const express = require('express')
// access router portion of express variable
const router = express.Router() // router is required to create routes
// base route
router.get('/', (req, res) => {
    res.render('index')
})

module.exports = router