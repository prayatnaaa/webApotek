const mongoose = require("mongoose");

const mitraScheme = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  alamat: {
    type: String,
    required: true,
  },
  kontak: {
    type: Number,
    required: true,
  },
  obatType: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Mitra", mitraScheme);