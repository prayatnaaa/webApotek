const mongoose = require("mongoose");

const apotekScheme = new mongoose.Schema({
    nama: {
        type : String,
        required : true,
    },
    jumlah: {
        type : Number,
        required : true,
    },
    alamat: {
        type : String,
        required: true,
    },
});

module.exports = mongoose.model("Apotek", apotekScheme);