const express = require('express')
const Author = require('../models/author')
const router = express.Router()


// All authors route
router.get('/', async (req, res) => {
    let searchOptions = {}
    //use req.query since get requests use query strings (whereas post requests use .body)
    if (req.query.name != null && req.query.name !== ""){
        //regexp searches for partial matches ie jo -> would return josh, john etc.  'i' makes it case insensitive
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try{
        //inside of brackets is where you would put your different where conditions (we want everything)
        const authors = await Author.find(searchOptions)
        // second param is passing in authors object to the index view
        res.render('authors/index', { 
            authors: authors,
            searchOptions: req.query
        })
    } catch {
        res.redirect('/')
    }

})

// New Author Route
router.get('/new', async (req, res) => {
    res.render('authors/new', { author: new Author() }) //
})

// Create author route
router.post('/', async (req, res) => {
    //create author from form request. .name gets the input that had name="name" (remember post route in html)
    const author = new Author({
        name: req.body.name
    })
    try {
        // create newAuthor variable once it has been created in mongo
        const newAuthor = await author.save()
        // res.redirect(`authors/${newAuthor.id}`)
        res.redirect(`authors`)
    } catch {
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating Author'
        })
    }
})


module.exports = router