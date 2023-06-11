// membuat variable router dengan require atau export variabel express
// Dan menggunakan metode Router
const router = require("express").Router();
// export controller yang ingin dipakai
const mitraControllers = require("../controllers/mitraControllers");

// endpoint mahasiswa
router.get("/", mitraControllers.viewMitra); // Untuk view
router.post("/", mitraControllers.addMitra);
router.put("/", mitraControllers.editMitra);
router.delete("/:id", mitraControllers.deleteMitra);

// Lalu export routernya
module.exports = router;