const http = require('http');
const fs = require('fs');
const port = 3000

//untuk penulisan bisa lebih rapi pakai switch case
//terus readfile dibikin fungsi sendiri parameternya path file

http.createServer((request, response) => {
    response.writeHead(200, {
        'Content-Type': 'text/html'
    })
    const url = request.url
    if (url === '/about') {
        fs.readFile('./about.html', (error, data) => {
            if (error){
                response.writeHead(404)
                response.writeHead("page not found")
            } else {
                response.write(data)
            }
            response.end()
        })
    } else {
        fs.readFile('./index.html', (error, data) => {
            if (error){
                response.writeHead(404)
                response.writeHead("page not found")
            } else {
                response.write(data)
            }
            response.end()
        })
    }
}).listen(port, () => {
    console.log(`server open on port ${port}`)
})