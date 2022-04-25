const validator = require('validator')
const chalk = require("chalk")

// console.log(validator.isEmail("zaki@gmail.com"))
// console.log(validator.isMobilePhone("+62812345678910", 'id-ID'))
// console.log(chalk.dim.black.bgBlue("hello world"))
const pesan = chalk`halo {bgRed halo} world sinzou sasageyo abcdefg`
console.log(pesan)
