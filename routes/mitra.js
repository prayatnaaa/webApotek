// membuat variable router dengan require atau export variabel express
// Dan menggunakan metode Router
const router = require("express").Router();
// export controller yang ingin dipakai
const mitraControllers = require("../controllers/mitraControllers");

// endpoint mahasiswa
router.get("/", mitraControllers.viewMitra); // Untuk view
router.get("/id/:id", mitraControllers.viewDetailMitra);
router.get("/alamat/:alamat", mitraControllers.viewMitraByAlamat);
router.get("/jenis/:obatType", mitraControllers.viewMitraByJenisObat);
router.get("/telp/:kontak", mitraControllers.viewMitraByNo);
router.post("/", mitraControllers.addMitra);
router.put("/", mitraControllers.editMitra);
router.delete("/:id", mitraControllers.deleteMitra);

// Lalu export routernya
module.exports = router;