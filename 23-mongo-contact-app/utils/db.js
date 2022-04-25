const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/belajarNodeJs', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

//Membuat schema
// const Contact = mongoose.model('Contact', {
//     nama: {
//         type: String,
//         required: true,
//     },
//     nohp: {
//         type: String,
//         required: true,
//     },
//     email: {
//         type: String,
//     },
// })

//Menambah 1 data
// const contact1 = new Contact({
//     nama: "zuraki",
//     nohp: "089911234412",
//     email: "zuraki@gmail.com"
// })

//Simpan ke collection
// contact1.save().then((result) => {
//     console.log(result)
// })