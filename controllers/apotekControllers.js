const Apotek = require("../models/Apotek");

module.exports = {
  viewApotek: async (req, res) => {
    try {
      const apotek = await Apotek.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("index", {
        apotek,
        alert,
        title: "OBAT", // Untuk title dari aplikasi kita, saya manamakannya dengan CRUD
      });
    } catch (error) {
      res.redirect("/apotek");
    }
  },
 
  // Membuat create data untuk obat
  // Membuat fungsi untuk menambahkan data di form dan menggunakan async await
  addObat: async (req, res) => {
    // memberi validasi untuk inputan yang kosong
    try {
      // Membuat contanta untuk nama, nim, jurusan, dan alamat yang diambil dari body/yang diketikan di form
      const { id, nama, harga, deskripsi, jenisObat } = req.body;
      // lalu mengembalikan fungsi dan membuat data dari scheme/model Mahasiswa
      await Apotek.create({ id, nama, harga, deskripsi, jenisObat });
      // ketika create data berhasil memberikan notifikasi
      req.flash("alertMessage", "Success add data Obat");
      req.flash("alertStatus", "success");
      res.redirect("/apotek"); // Setelah berhasil membuat data akan meredirect ke tujuan yang sudah ditentukan
    } catch (error) {
      // ketika create data error memberikan notifikasi
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      // ketika inputan kosong, maka redirect kehalaman
      res.redirect("/apotek");
    }
  },
  

  // Membuat update data untuk obat
  editObat: async (req, res) => {
    try {
      // Membuat variabel yang menerima id, dan nama yang didapat dari req body atau yang di inputkan di form input
      const { id, nama, harga, deskripsi, jenisObat } = req.body;
      /*  mencari variabel yang dideklarasikan diatas dan mengecek _id yang ada di req body yang dikirim
   _id didapat database dan id isinya dari inputan user */
      const apotek = await Apotek.findOne({ _id: id });
      /* mahasiswa diambil dari fungsi diatas dan titik(.) nama diambil dari database = nama yang didapat dari req body
   yang tentu dikirimkan dari inputan user */
      apotek.nama = nama;
      apotek.harga = harga;
      apotek.deskripsi = deskripsi;
      apotek.jenisObat = jenisObat;
      // Menyimpan datanya ke database
      await apotek.save();
      // ketika edit data berhasill memberikan notifikasi/alert
      req.flash("alertMessage", "Success edit data obat");
      req.flash("alertStatus", "success");
      // Setelah berhasil maka meredirect ke tujuan yang ditentukan (/mahasiswa)
      res.redirect("/apotek");
    } catch (error) {
      // ketika edit data error memberikan notifikasi erronya
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      // ketika inputan kosong maka redirect kehalaman (/mahasiswa)
      res.redirect("/apotek");
    }
  },

  // Membuat delete data untuk mahasiswa
  deleteObat: async (req, res) => {
    try {
      /*
  Membuat variabel yang menerima id yang didapat dari params
  id didapat database dan id isinya dari params
  */
      const { id } = req.params;
      // cek data Mahasiswa yang mau di delete berdasarkan id
      const apotek = await Apotek.findOne({ _id: id });
      // setelah datanya sudah didapat maka menghapusnya
      await apotek.deleteOne();
      // ketika delete data memberikan notifikasi
      req.flash("alertMessage", "Success delete data obat");
      req.flash("alertStatus", "warning");
      // setelah berhasil remove maka melakukan redirect
      res.redirect("/apotek");
    } catch (error) {
      // ketika create data error memberikan notifikasi
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      // ketika inputa kosong redirect kehalaman
      res.redirect("/apotek");
    }
  },
};