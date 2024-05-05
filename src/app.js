const path=require('path')
const express = require('express')
const hbs = require('hbs')
const { get } = require('http')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// define paths for express config
const publicDirectory=path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
app.use(express.static(publicDirectory))

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Rishi'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        name: 'Rishi Doerga'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        name: 'Rishi',
        helpText: 'this is some help'
    })
})


app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error:'must provide an address in querystring'
        })
    }
    geocode(req.query.address, (error,{latitude,longitude,location} = {}) => {
        if(error) {
           return res.send({
            error: 'Could not find the address'
           })
        }
       forecast(latitude, longitude, (error,forecastdata) => {
        if (error) {
            return res.send({
                error: 'Could not find a forcast for the address'
               })
        }
        res.send({
            address: req.query.address,
            current: forecastdata,
            location
        })
         })
      
    })
})


app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res) => {
    res.render('404', {
        errorText: 'help article not foud',
        name: 'Rishi',
        title: '404'
    })
})

// 404 handler
app.get('*',(req,res) => {
    res.render('404', {
        errorText: 'My 404 page',
        name: 'Rishi',
        title: '404'
    })
})
app.listen(3000, () => {
    console.log('server started on port 3000.')
})