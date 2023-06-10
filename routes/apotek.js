// membuat variable router dengan require atau export variabel express
// Dan menggunakan metode Router
const router = require("express").Router();
// export controller yang ingin dipakai
const apotekController = require("../controllers/apotekControllers");

// endpoint mahasiswa
router.get("/", apotekController.viewApotek); // Untuk view
router.post("/", apotekController.addObat);
router.put("/", apotekController.editObat);
router.delete("/:id", apotekController.deleteObat);

// Lalu export routernya
module.exports = router;