const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const suppliersRoute = require('./api/routes/supplier')
const entriesRoute = require('./api/routes/entry')
const userRoute = require('./api/routes/user')

let devurl = 'mongodb://localhost/queens_price'
let deployUrl = "mongodb+srv://jeremy:jeremy123@cluster0.fd5ck.mongodb.net/QUEENS_PRICE_MANAGEMENT?retryWrites=true&w=majority"

mongoose.connect(devurl, {useCreateIndex : true,useNewUrlParser : true, useUnifiedTopology : true})
let db = mongoose.connection

db.once('open', () => {
    console.log('Database Connected')
})
db.on('error', err => {
    if (err) throw err;
    console.log(err)  
})

const app = express()

app.use(cors())
app.use(cookieParser())
app.use('/uploads',express.static('./assets/images/uploads'))
app.use(express.urlencoded({extended : false}))
app.use(express.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
app.use('/suppliers', suppliersRoute)
app.use('/entries', entriesRoute)
app.use('/user', userRoute)


app.use((req, res) => {
    res.status(200).json(
        {
            routes : ['/suppliers', '/entries',],
            authors : 'Ermias Gashu and Nebiyu'
        }
    )
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log('Server running on port 5000')
})