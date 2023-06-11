const mongoose = require("mongoose");

const resepScheme = new mongoose.Schema({
  namaPasien: {
    type: String,
    required: true,
  },
  namaDokter: {
    type: String,
    required: true,
  },
  kontakDokter: {
    type: Number,
    required: true,
  },
  deskripsi: {
    type: String,
    required: true,
  },
  laporanDokter: {
    type: String,
    required: true,
  },
  dosis: {
    type: String,
    required: true,
  }
});
module.exports = mongoose.model("Resep", resepScheme);