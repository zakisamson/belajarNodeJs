const {
    MongoClient
} = require('mongodb')
const {
    reverseMultiplyAndSum
} = require('validator/lib/util/algorithms')

//konfigurasi tambahan biar ga error objectid undefined
const ObjectId = require("mongodb").ObjectId

//port default
const uri = 'mongodb://127.0.0.1:27017'
const dbName = "belajarNodeJs"

//konfigurasi dasar
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


client.connect((error, client) => {
    //guard kalo ada error
    if (error) {
        return console.log('koneksi gagal')
    }

    //pilih db dulu
    const db = client.db(dbName)

    //menambahkan 1 data ke collection mahasiswa
    db.collection('mahasiswa').insertOne({
        nama: "sukuna",
        email: "sukuna@gmail.com"
    }, (error, result) => {
        if (error) {
            return console.log("gagal")
        }
        console.log(result)
    })

    //menambahkan beberapa data sekaligus
    db.collection('mahasiswa').insertMany([  //menggunakan array of object
        {
            nama: "zaki",
            email: "zakiii@gmail.com"
        },
        {
            nama: "jaran",
            email: "jaran@gmail.com"
        }
    ], (error, result) => {
        if(error){
            return console.log("error")
        }
        console.log(result)
    })

    //menampilkan data
    console.log(db.collection("mahasiswa").find().toArray((error, result) => {
        console.log(result)
    }))

    //menampilkan data dengan kriteria
    console.log(db.collection("mahasiswa").find({
        nama: "zaki"
    }).toArray((error, result) => {
        console.log(result)
    }))

    //update 1 data
    db.collection("mahasiswa").updateOne({
        _id: ObjectId('6264d81e948b9fd6dcd23c4b')
    }, {
        $set: {
            nama: "zaki",
            email: "zuraki@yahoo.com"
        }
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

    //udpate banyak data
    db.collection("mahasiswa").updateMany({
        nama: "zaki"
    }, {
        $set: {
            nama: 'yusuf zaki'
        }
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

    //menghapus 1 data
    db.collection("mahasiswa").deleteOne({
        _id: ObjectId("6264d81e948b9fd6dcd23c4c")
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

    //menghapus banyak data
    db.collection("mahasiswa").deleteMany({
        nama: "yusuf zaki"
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
})