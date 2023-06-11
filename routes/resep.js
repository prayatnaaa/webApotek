// membuat variable router dengan require atau export variabel express
// Dan menggunakan metode Router
const router = require("express").Router();
// export controller yang ingin dipakai
const resepControllers = require("../controllers/resepControllers");

// endpoint mahasiswa
router.get("/", resepControllers.viewResep); // Untuk view
router.get("/id/:id", resepControllers.viewDetailResep);
router.post("/", resepControllers.addResep);
router.put("/", resepControllers.editResep);
router.delete("/:id", resepControllers.deleteResep);

// Lalu export routernya
module.exports = router;