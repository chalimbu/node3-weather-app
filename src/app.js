//first the core afther npm, after users utils
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

//define paths to express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handelebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setub static directory to server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {

    res.render('index', {
        title: 'Weather',
        name: ' Sebastian Zapata'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Sebastian Zapata'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Plis check your brain, this router goes nowhere',
        title: 'help',
        name: 'sebastian zapata'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: ' you must provide an address term'
        })
    }
    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        console.log(req.query.addres)
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                location,
                forecast: forecastData,
                address: req.query.address

            })
        })
    })


})

app.get('/products', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: ' you must provide a search term'
        })
    }

    res.send({
        forecast: ' It is snowing',
        location: 'Philadelphia',
        address: req.query.address
    })



})
app.get('/help/*', (req, res) => {
    res.render('error-page', {
        title: 'About me',
        autor: 'Sebastian Zapata',
        message: 'Help article no found'
    })
})

app.get('*', (req, res) => {
    res.render('error-page', {
        title: '404',
        message: 'Page no found',
        autor: 'Sebastian Zapata',

    })
})


app.listen(port, () => {
    console.log('Server is up on port 3000.')
})