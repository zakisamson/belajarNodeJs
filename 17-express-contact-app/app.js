const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const { loadContact, findContact } = require('./utils/contacts')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
//third-party middleware
app.use(expressLayouts)

//built in middleware. suoaya mesin bisa akses folder public 
app.use(express.static('public'))

app.get('/', (req, res) => {
  const mahasiswa = [{
      nama: 'zaki',
      nohp: '0894412221928',
      email: 'asdf@gmail.com'
    },
    {
      nama: 'samson',
      nohp: '0894412221927',
      email: 'qwer@gmail.com'
    },
    {
      nama: 'rico',
      nohp: '0894412221926',
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
  const contacts = loadContact()
  res.render('contact', {
    title: 'contact',
    layout: 'layouts/skeleton',
    contacts,
  })
})

app.get('/contact/:nama', (req, res, next) => {
  const contact = findContact(req.params.nama)
  res.render('detail', {
    title: 'detail contact',
    layout: 'layouts/skeleton',
    contact,
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