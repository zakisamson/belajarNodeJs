// console.log("hello world")
const cetakNama = (nama) => `Hi nama saya ${nama}`;

const PI = 3.14;

const mahasiswa = {
    nama: 'Fauzan',
    umur: 20,
    cetakMhs(){
        return `Halo, nama saya ${this.nama}, umur saya ${this.umur} tahun`
    }
}

// module.exports.cetakNama = cetakNama;
// module.exports.PI = PI;
// module.exports.mahasiswa = mahasiswa;

// module.exports = {
//     cetakNama : cetakNama,
//     PI : PI,
//     mahasiswa : mahasiswa,
// }

module.exports = {
    cetakNama,
    PI,
    mahasiswa,
}