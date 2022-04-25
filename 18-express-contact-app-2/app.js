const express = require('express')
const expressLayouts = require('express-ejs-layouts')
// const session = require('express-session')
// const cookieParser = require('cookie-parser')
// const flash = require('connect-flash')
const {
  loadContact,
  findContact,
  addContact,
  cekDuplikat
} = require('./utils/contacts')

const app = express()
const port = 3000

app.set('view engine', 'ejs')
//third-party middleware
app.use(expressLayouts)
const {
  body,
  validationResult,
  check
} = require('express-validator');

//built in middleware. supaya mesin bisa akses folder public 
app.use(express.static('public'))
app.use(express.urlencoded({
  extended: true
}))

//konfigurasi flash message
// app.use(cookieParser('secret'))
// app.use(
//   session({
//     cookie: {
//       maxAge: 6000
//     },
//     secret: 'secret',
//     resave: true,
//     saveUninitialized: true
//   })
// )
// app.use(flash)

app.get('/', (req, res) => {
  res.render('index', {
    nama: 'zaki samson',
    title: 'home',
    layout: 'layouts/skeleton'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'about',
    layout: 'layouts/skeleton'
  })
})

app.get('/contact', (req, res) => {
  const contacts = loadContact()
  res.render('contact', {
    title: 'contact',
    layout: 'layouts/skeleton',
    contacts,
    // msg: req.flash('msg')
  })
})

//halaman tambah data kontak
app.get('/contact/add', (req, res, next) => {
  res.render('addContact', {
    title: 'add contact',
    layout: 'layouts/skeleton',
  })
})

//proses data kontak
app.post('/contact', [
  body('nama').custom((value) => {
    const duplikat = cekDuplikat(value);
    if (duplikat) {
      throw new Error('Nama sudah terdaftar')
    }
    return true
  }),
  check('email', 'Email tidak valid.').isEmail(),
  check('nohp', 'Nomor hp tidak valid').isMobilePhone('id-ID'),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render('addContact', {
      title: 'add contact',
      layout: 'layouts/skeleton',
      errors: errors.array()
    })
  } else {
    addContact(req.body)
    //kirimkan flash message
    // req.flash('msg', 'Kontak berhasil ditambahkan!')
    res.redirect('/contact')
  }
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