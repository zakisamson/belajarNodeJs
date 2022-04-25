const fs = require('fs')
const chalk = require("chalk")
const validator = require("validator")

const dirPath = "./data"
//membuat folder untuk json jika belum ada
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

const dataPath = './data/contacts.json'
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8')
}

const loadContact = () => {
    const file = fs.readFileSync("data/contacts.json", 'utf-8');
    const contacts = JSON.parse(file);
    return contacts
}

const simpanContact = (nama, email, noHp) => {
    const contact = {
        nama,
        email,
        noHp,
    };
    const contacts = loadContact()
    const duplicate = contacts.find((contact) => contact.nama === nama)

    if (duplicate) {
        console.log(chalk.red.inverse.bold("kontak sudah terdaftar"))
        return false
    }

    if (email) {
        const validEmail = validator.isEmail(email)
        if (!validEmail) {
            console.log(chalk.red.inverse.bold("email tidak valid"))
            return false
        }
    }

    if (noHp) {
        if (!validator.isMobilePhone(noHp, 'id-ID')) {
            console.log(chalk.red.inverse.bold("nomor hape tidak valid"))
            return false
        }
    }

    contacts.push(contact);

    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))

    console.log(chalk.green.inverse.bold("terimakasih sudah memasukkan data"))
}

const listContact = () => {
    const contacts = loadContact()
    console.log(chalk.blue.inverse("daftar kontak"))
    contacts.forEach((contact, i) => {
        console.log(`${i+1}. ${contact.nama} - ${contact.noHp}`)
    })
}

const detailContact = (nama) => {
    const contacts = loadContact()
    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase())
    if (contact) {
        console.log(chalk.cyan.inverse(`detail info ${nama}`))
        if (contact.email) {
            console.log(contact.nama, contact.email, contact.noHp)
        } else {
            console.log(contact.nama, contact.noHp)
        }
    } else {
        console.log(chalk.red.inverse("kontak tidak ditemukan"))
    }
    // contacts.forEach((contact, i) =>{
    //     if(contact.nama === nama){
    //         if(contact.email){
    //             console.log(`${contact.nama} - ${contact.email} - ${contact.noHp}`)
    //         }else{
    //             console.log(`${contact.nama} - ${contact.noHp}`)
    //         }
    //     }
    // })
}

const deleteContact = (nama) => {
    const contacts = loadContact()
    const newContacts = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase())
    if(contacts.length === newContacts.length){
        console.log(chalk.red.inverse("kontak tidak ditemukan"))
        return false
    }
    fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts))
    console.log(chalk.green.inverse.bold(`${nama} berhasil dihapus`))

}

module.exports = {
    tulisPertanyaan,
    simpanContact,
    listContact,
    detailContact,
    deleteContact,
}