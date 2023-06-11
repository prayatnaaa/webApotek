// membuat variable router dengan require atau export variabel express
// Dan menggunakan metode Router
const router = require("express").Router();
// export controller yang ingin dipakai
const customerControllers = require("../controllers/customerControllers");

// endpoint mahasiswa
router.get("/", customerControllers.viewCustomer); // Untuk view
router.post("/", customerControllers.addCustomer); // Untuk add
router.put("/", customerControllers.editCustomer); // Untuk edit
router.delete("/:id", customerControllers.deleteCustomer); // Untuk delete

// Lalu export routernya 
module.exports = router;