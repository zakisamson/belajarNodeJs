const fs = require('fs')

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

//cari kontak berdasarkan nama
const findContact = (nama) => {
    const contacts = loadContact()
    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase())
    return contact;
}

//menimpa file contacts.json dengan yg baru
const saveContacts = (contacts) => {
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))
}

//menambahkan data contact baru 
const addContact = (contact) => {
    const contacts = loadContact()
    contacts.push(contact)
    saveContacts(contacts)
}

//cek apakah nama duplikat
const cekDuplikat = (nama) => {
    const contacts = loadContact()
    return contacts.find((contact) => contact.nama === nama)
}

const deleteContact = (nama) => {
    const contacts = loadContact()
    const filteredContacts = contacts.filter((contact) => contact.nama !== nama)
    saveContacts(filteredContacts)
}

const updateContacts = (contactBaru) => {
    const contacts = loadContact()
    //hilangkan kontak lama yg namanya sama dengan namaLama
    const filteredContacts = contacts.filter((contact) => contact.nama !== contactBaru.namaLama)
    delete contactBaru.namaLama
    filteredContacts.push(contactBaru)
    saveContacts(filteredContacts)
}

module.exports = {
    loadContact,
    findContact,
    addContact,
    cekDuplikat,
    deleteContact,
    updateContacts
}