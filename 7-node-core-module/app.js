//core module
// file system
const fs = require('fs');
const readline = require('readline');

// try{
//     fs.writeFileSync('data/test.txt', "halo halo sinkronus");
// } catch (err) {
//     console.log(err)
// }

//menuliskan string ke file secara async
// fs.writeFile('data/test.txt', "halo halo async", (error) =>{
//     console.log(error);
// })

//membaca isi file secra synchronous
// const tulisan = fs.readFileSync('data/test.txt', 'utf-8')
// console.log(tulisan);

//membaca isi file secara asynchronous
// fs.readFile('data/test.txt', 'utf-8', (err, data) => {
//     if (err) throw err;
//     console.log(data);
//   });

//readline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('What is your name? ', (nama) => {
    rl.question("how old are you?", (umur) =>{
        const contact = {
            nama: nama,
            umur: umur,
        };
        const file = fs.readFileSync("data/contact.json", 'utf-8');
        const contacts = JSON.parse(file);
        contacts.push(contact);

        fs.writeFileSync('data/contact.json', JSON.stringify(contacts))
        rl.close();
    })
});