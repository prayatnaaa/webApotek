const Resep = require("../models/Resep");

// Dibawah ini kita menggunakan metod export, maka semua metod yang ada di dalam object(module.exports) akan ter export
module.exports = {
  // Membuat view untuk mahasiswa
  viewResep: async (req, res) => {
    try {
      // Membuat variabel mahasiswa, dan menunda eksekusi hingga proses async selesai lalu mengambil model Mahasiswa
      // dan menggunakan method find untuk mengambil semua collection/tabel yang ada di database Mahasiswa
      const resep = await Resep.find();
      // Membuat variabel untuk alertMessage  dan alertStatus
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      // membuat variabel yang bersifat object dan memiliki sebuah pesan isinya mengambil dari variabel alertMessage dan alertStatus
      const alert = { message: alertMessage, status: alertStatus };
      /**
       * Lalu render viewnya yang ada di dalam file index
       * menampilkan datanya dan mendestracturkan nya, lalu memanggil variabel mahasiswa diatas
       * Lalu merender alert yang sudah di deklar di atas
       */
      res.render("resep_index", {
        resep,
        alert,
        title: "CRUD", // Untuk title dari aplikasi kita, saya manamakannya dengan CRUD
      });
    } catch (error) {
      // Jika error maka akan meredirect ke route mahasiswa(routenya akan kita buat setelah selesai dengan mahasiswaController)
      res.redirect("/resep");
    }
  },

  viewDetailResep : async(req, res) => {
    req.session.loggedIn = true;
    try{
        const resep = await Resep.findOne({_id:req.params.id});
        const namaDokter = resep.namaDokter;
        const alertMessage = req.flash("alertMessage");
        const alertStatus = req.flash("alertStatus");
        const alert = {message:alertMessage, status: alertStatus};
        res.render("detail_resep_index", {
            resep,
            namaDokter,
            alert,
            title: "Detail Resep"
        });
    }catch(error){
        req.flash("alertMessage", '${error.message}');
        req.flash("alertStatus", "danger");
        res.redirect("/resep");
    }
},
//   viewMitraByAlamat: async (req, res) => {
//     req.session.loggedIn = true;
//     try {
//       const mitra = await Mitra.find({alamat:req.params.alamat});
//     //   message and status
//       const alertMessage = req.flash("alertMessage");
//       const alertStatus = req.flash("alertStatus");
//       const alert = { message: alertMessage, status: alertStatus };

//     //   render componen
    
//       res.render("mitra_index", {
//         mitra,
//         alert,
//         title: "Mitra Table",
//         heading: "Tabel Mitra"
//       });
//     } catch (error) {
//       // back to user jika error
//       res.redirect("/mitra");
//     }
//   },
//   viewMitraByNo: async (req, res) => {
//     req.session.loggedIn = true;
//     try {
//       const mitra = await Mitra.find({kontak:req.params.kontak});
//     //   message and status
//       const alertMessage = req.flash("alertMessage");
//       const alertStatus = req.flash("alertStatus");
//       const alert = { message: alertMessage, status: alertStatus };

//     //   render componen
    
//       res.render("mitra_index", {
//         mitra,
//         alert,
//         title: "Mitra Table",
//         heading: "Tabel Mitra"
//       });
//     } catch (error) {
//       // back to user jika error
//       res.redirect("/mitra");
//     }
//   },
//   viewMitraByJenisObat: async (req, res) => {
//     req.session.loggedIn = true;
//     try {
//       const mitra = await Mitra.find({obatType:req.params.obatType});
//     //   message and status
//       const alertMessage = req.flash("alertMessage");
//       const alertStatus = req.flash("alertStatus");
//       const alert = { message: alertMessage, status: alertStatus };

//     //   render componen
    
//       res.render("mitra_index", {
//         mitra,
//         alert,
//         title: "Mitra Table",
//         heading: "Tabel Mitra"
//       });
//     } catch (error) {
//       // back to user jika error
//       res.redirect("/mitra");
//     }
//   },
 
  // Membuat create data untuk obat
  // Membuat fungsi untuk menambahkan data di form dan menggunakan async await
  addResep: async (req, res) => {
    // memberi validasi untuk inputan yang kosong
    try {
      // Membuat contanta untuk nama, nim, jurusan, dan alamat yang diambil dari body/yang diketikan di form
      const { namaPasien, namaDokter, kontakDokter, deskripsi, laporanDokter, dosis} = req.body;
      // lalu mengembalikan fungsi dan membuat data dari scheme/model Mahasiswa
      await Resep.create({ namaPasien, namaDokter, kontakDokter, deskripsi, laporanDokter, dosis });
      // ketika create data berhasil memberikan notifikasi
      req.flash("alertMessage", "Success add Resep Obat");
      req.flash("alertStatus", "success");
      res.redirect("/resep"); // Setelah berhasil membuat data akan meredirect ke tujuan yang sudah ditentukan
    } catch (error) {
      // ketika create data error memberikan notifikasi
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      // ketika inputan kosong, maka redirect kehalaman
      res.redirect("/resep");
    }
  },
  

  // Membuat update data untuk obat
  editResep: async (req, res) => {
    try {
      // Membuat variabel yang menerima id, dan nama yang didapat dari req body atau yang di inputkan di form input
      const { namaPasien, namaDokter, kontakDokter, deskripsi, laporanDokter, dosis } = req.body;
      /*  mencari variabel yang dideklarasikan diatas dan mengecek _id yang ada di req body yang dikirim
   _id didapat database dan id isinya dari inputan user */
      const resep = await Resep.findOne({ _id: id });
      /* mahasiswa diambil dari fungsi diatas dan titik(.) nama diambil dari database = nama yang didapat dari req body
   yang tentu dikirimkan dari inputan user */
      resep.namaPasien = namaPasien;
      resep.namaDokter = namaDokter;
      resep.kontakDokter = kontakDokter;
      resep.deskripsi = deskripsi;
      resep.laporanDokter = laporanDokter;
      resep.dosis = dosis;
      // Menyimpan datanya ke database
      await resep.save();
      // ketika edit data berhasill memberikan notifikasi/alert
      req.flash("alertMessage", "Success edit Resep Obat");
      req.flash("alertStatus", "success");
      // Setelah berhasil maka meredirect ke tujuan yang ditentukan (/mahasiswa)
      res.redirect("/resep");
    } catch (error) {
      // ketika edit data error memberikan notifikasi erronya
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      // ketika inputan kosong maka redirect kehalaman (/mahasiswa)
      res.redirect("/resep");
    }
  },

  // Membuat delete data untuk mahasiswa
  deleteResep: async (req, res) => {
    try {
      /*
  Membuat variabel yang menerima id yang didapat dari params
  id didapat database dan id isinya dari params
  */
      const { id } = req.params;
      // cek data Mahasiswa yang mau di delete berdasarkan id
      const resep = await Resep.findOne({ _id: id });
      // setelah datanya sudah didapat maka menghapusnya
      await resep.deleteOne();
      // ketika delete data memberikan notifikasi
      req.flash("alertMessage", "Success delete resep obat");
      req.flash("alertStatus", "warning");
      // setelah berhasil remove maka melakukan redirect
      res.redirect("/resep");
    } catch (error) {
      // ketika create data error memberikan notifikasi
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      // ketika inputa kosong redirect kehalaman
      res.redirect("/resep");
    }
  },
};