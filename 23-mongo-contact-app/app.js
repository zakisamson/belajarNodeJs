const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const Contact = require("./model/contact")
const {
    body,
    validationResult,
    check
} = require('express-validator');
const {
    updateOne
} = require('./model/contact');

const app = express()
const port = 3000

//Inisialisasi koneksi ke mongoose
require("./utils/db")

//Setup EJS
app.set('view engine', 'ejs')
app.use(expressLayouts)

//Setup methodOverride
app.use(methodOverride('_method'))

//Built in middleware. supaya mesin bisa akses folder public 
app.use(express.static('public'))
app.use(express.urlencoded({
    extended: true
}))

app.listen(port, () => {
    console.log(`Mongo Contact App | listening at http://localhost:${port}`)
})

//Home
app.get('/', (req, res) => {
    res.render('index', {
        nama: 'zaki samson',
        title: 'home',
        layout: 'layouts/skeleton'
    })
})

//About
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about',
        layout: 'layouts/skeleton'
    })
})

//Contact
app.get('/contact', async (req, res) => {
    const contacts = await Contact.find()

    res.render('contact', {
        title: 'contact',
        layout: 'layouts/skeleton',
        contacts,
    })
})

//Membuka halaman tambah kontak
app.get('/contact/add', (req, res) => {
    res.render('addContact', {
        title: 'add contact',
        layout: 'layouts/skeleton',
    })
})

//Fungsi tambah kontak
app.post('/contact', [
    body('nama').custom(async (value) => {
        const duplikat = await Contact.findOne({
            nama: value
        });
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
        Contact.insertMany(req.body, (error, result) => {
            res.redirect('/contact')
        })
    }
})

//Contact detail
app.get('/contact/:nama', async (req, res) => {
    const contact = await Contact.findOne({
        nama: req.params.nama
    })
    res.render('detail', {
        title: 'detail contact',
        layout: 'layouts/skeleton',
        contact,
    })
})

//Hapus kontak cara 1
// app.get('/contact/delete/:nama', async (req, res) => {
//     const contact = await Contact.findOne({
//         nama: req.params.nama
//     })
//     //jika kontak tidak ada
//     if (!contact) {
//         res.status(404)
//         res.send('<h1>404 page not found</h1>')
//     } else {
//         Contact.deleteOne({
//             _id: contact._id
//         }, (error, result) => {
//             res.redirect('/contact')
//         })
//     }
// })

//Hapus kontak cara 2
app.delete('/contact', (req, res) => {
    Contact.deleteOne({
        nama: req.body.nama
    }, (error, result) => {
        res.redirect('/contact')
    })
})

//Membuka halaman ubah kontak
app.get('/contact/edit/:nama', async (req, res) => {
    const contact = await Contact.findOne({
        nama: req.params.nama
    })
    res.render('editContact', {
        title: 'edit contact',
        layout: 'layouts/skeleton',
        contact,
    })
})

//Fungsi ubah kontak
app.put('/contact', [
    body('nama').custom(async (value, {
        req
    }) => {
        const duplikat = await Contact.findOne({
            nama: value
        });
        if (value !== req.body.namaLama && duplikat) {
            throw new Error('Nama sudah terdaftar')
        }
        return true
    }),
    check('email', 'Email tidak valid.').isEmail(),
    check('nohp', 'Nomor hp tidak valid').isMobilePhone('id-ID'),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('editContact', {
            title: 'edit contact',
            layout: 'layouts/skeleton',
            errors: errors.array(),
            contact: req.body
        })
    } else {
        Contact.updateOne({
            _id: req.body._id
        }, {
            $set: {
                nama: req.body.nama,
                email: req.body.email,
                nohp: req.body.nohp
            }
        }).then((result) => {
            res.redirect('/contact')
        })
    }
})

//Halaman 404
app.use('', (req, res) => {
    res.status(404)
    res.send("<h1>404 page not found</h1>")
})