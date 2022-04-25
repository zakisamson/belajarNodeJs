const { argv } = require("yargs");
const yargs = require("yargs");
const { simpanContact, listContact, detailContact, deleteContact } = require("./contacts");

//ambil argumen dari command line
// console.log(process.argv[2])

// console.log(yargs.argv)
yargs.command({
    command: 'add',
    describe: 'menambahkan kontak baru',
    builder: {
        nama: {
            describe: 'nama lengkap contact',
            demandOption: true,
            type: 'string'
        },
        email: {
            describe: 'email contact',
            demandOption: false,
            type: 'string'
        },
        noHp: {
            describe: 'no telepon contact',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        simpanContact(argv.nama, argv.email, argv.noHp)
    }
}).demandCommand()


yargs.command({
    command: "list",
    describe: "menampilkan nama dan no hp contact",
    handler(){
        listContact()
    }
})

yargs.command({
    command: "details",
    describe: "menampilkan detail dari sebuah contact berdasarkan nama",
    builder:{
        nama: {
            describe: 'nama  contact',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv){
        detailContact(argv.nama)
    }
})

yargs.command({
    command: "delete",
    describe: "menghapus sebuah contact berdasarkan nama",
    builder:{
        nama: {
            describe: 'nama contact',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv){
        deleteContact(argv.nama)
    }
})

yargs.parse()

// const {tulisPertanyaan, simpanContact} = require('./contacts.js')

// const main = async () => {
//     const nama = await tulisPertanyaan('masukkan nama: ');
//     const email = await tulisPertanyaan('masukkan email: ');
    
//     simpanContact(nama, email)
// }

// main()