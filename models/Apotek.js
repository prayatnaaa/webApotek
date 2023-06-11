const mongoose = require("mongoose");

const apotekScheme = new mongoose.Schema({
    nama: {
        type : String,
        required : true,
    },
    harga: {
        type : Number,
        required : true,
    },
    deskripsi: {
        type : String,
        required: true,
    },
    jenisObat: {
        type : String,
        required: true,
    }
});

module.exports = mongoose.model("Apotek", apotekScheme);