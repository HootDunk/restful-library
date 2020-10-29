if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

// require the index file from routes folder so that the server has access
const indexRouter = require('./routes/index')

//set view engine to ejs
app.set('view engine', 'ejs')
//set where views are coming from
app.set('views', __dirname + '/views') //__dirname gets current directory, then we add the views directory to it
// every single file goes in this layout file so we don't have to duplicate all beginning and ending html like the header and footer
app.set('layout', 'layouts/layout')
//tell our express app that we want to use express layouts
app.use(expressLayouts)
//tell express where our public files will be (stylesheets, js, images)
app.use(express.static('public'))

//set up database
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))


app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)//3000 included for development. server will tell us port when deployed.

/* Public folder is for public views and views folder is for server rendered views*/
/* Routes folder is same thing as controller.  Node and express refer to controllers as routes so that's why the naming is different. */
/* Models is where all database models will go*/
