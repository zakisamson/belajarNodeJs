const express = require('express')
const expressLayouts = require('express-ejs-layouts')
let ejs = require('ejs');
let morgan = require('morgan');
const app = express()
const port = 3000

app.set('view engine', 'ejs')
//third-party middleware
app.use(expressLayouts)
app.use(morgan('dev'))

//built in middleware
app.use(express.static('public'))

//application level middelware
app.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})

app.get('/', (req, res) => {
  const mahasiswa = [{
      nama: 'zaki',
      email: 'asdf@gmail.com'
    },
    {
      nama: 'samson',
      email: 'qwer@gmail.com'
    },
    {
      nama: 'rico',
      email: 'rico@gmail.com'
    },
  ]
  res.render('index', {
    nama: 'zaki samson',
    title: 'home',
    mahasiswa: mahasiswa,
    layout: 'layouts/skeleton'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'about',
    layout: 'layouts/skeleton'
  })
})

app.get('/contact', (req, res, next) => {
  res.render('contact', {
    title: 'contact',
    layout: 'layouts/skeleton'
  })
})

app.get("/product/:id?", (req, res) => {
  res.send(`produk ID:  ${req.params.id} category: ${req.query.category}`)
})

app.use('', (req, res) => {
  res.status(404)
  res.send("<h1>404 page not found</h1>")
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})