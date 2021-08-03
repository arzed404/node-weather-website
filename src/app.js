const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const forecastPath = path.join(publicDirectoryPath, "/js/forecast.js");
// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
const forecast = require(forecastPath)
// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
   


    res.render('index', {
        title: 'Weather',
        name: 'Rashid Zia'
        
    })

  
})
app.get('/login', (req, res) => {
   console.log(req.body)
    res.render('login', {
        title: 'Weather',
        name: 'Rashid Zia'
    })

})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Rashid Zia'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Rashid Zia'
    })
})

app.get('/weather', (req, res) => {
  
    address = req.query.address
    if(req.query.address){
        forecast(address, (error, forecastData) => {
            if (error) {
                
            res.send( {
                title: 'Weather',
                name: 'Rashid Zia',
                addressValue:address,
                error:error
                
            })
            }
            else{
          
            res.send( {
                title: 'Weather',
                name: 'Rashid Zia',
                addressValue:address,
                Forecast:forecastData,
                
            })}

        })
    }
    else
    res.send( {
        title: 'Weather',
        name: 'Rashid Zia',
        error:"Please enter the address first",
        addressValue:address,
    })

})
app.get("/products",(req,res)=>{
    
   // console.log(req.query)
    
    res.send({
        products:[],
    })

})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Rashid Zia',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Rashid Zia',
        errorMessage: 'Page not found.'
    })
})

app.listen(80, () => {
    console.log('Server is up on port 80.')
})