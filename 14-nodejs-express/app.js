const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  // res.send('Hello World!')
  // res.json({
  //   nama: 'asdfasdf',
  //   email: 'asdfasfd@gmail.com',
  //   noHP: '0898976127676'
  // })
  res.sendFile('./index.html', { root: __dirname })
})

app.get('/about', (req, res) => {
  res.sendFile('./about.html', { root: __dirname })
})

app.get('/contact', (req, res) => {
  res.send('ini contact')
})

// app.get("/product/:id/category/:idCategory", (req, res) => {
//   res.send("produk ID: "+ req.params.id + " / " + req.params.idCategory)
// })

app.get("/product/:id?", (req, res) => {
  res.send(`produk ID:  ${req.params.id} category: ${req.query.category}`)
})

app.use('', (req, res) => {
  res.status(404)
  res.send("<h1>404 page not found</h1>")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// const http = require('http');
// const fs = require('fs');
// const port = 3000

//untuk penulisan bisa lebih rapi pakai switch case
//terus readfile dibikin fungsi sendiri parameternya path file

// http.createServer((request, response) => {
//     response.writeHead(200, {
//         'Content-Type': 'text/html'
//     })
//     const url = request.url
//     if (url === '/about') {
//         fs.readFile('./about.html', (error, data) => {
//             if (error){
//                 response.writeHead(404)
//                 response.writeHead("page not found")
//             } else {
//                 response.write(data)
//             }
//             response.end()
//         })
//     } else {
//         fs.readFile('./index.html', (error, data) => {
//             if (error){
//                 response.writeHead(404)
//                 response.writeHead("page not found")
//             } else {
//                 response.write(data)
//             }
//             response.end()
//         })
//     }
// }).listen(port, () => {
//     console.log(`server open on port ${port}`)
// })

