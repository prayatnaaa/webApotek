const router = require("express").Router();

const userControllers = require('../controllers/userControllers');

router.get("/", userControllers.viewUser); // Untuk view
router.get("/nama/:nama", userControllers.viewUserByName); // Untuk view
router.get("/umur/:umur", userControllers.viewUserByUmur); // Untuk view
router.get("/alamat/:alamat", userControllers.viewUserByAlamat); // Untuk view
router.get("/telp/:telp", userControllers.viewUserByTelp); // Untuk view
router.get("/email/:email", userControllers.viewUserByEmail); // Untuk view
router.get("/tipe/:tipe", userControllers.viewUserByTipe); // Untuk view
router.get("/logout", userControllers.logoutUser); // Untuk view
router.post("/", userControllers.addUser); // Untuk add
router.put("/", userControllers.editUser); // Untuk edit
router.delete("/:id", userControllers.deleteUser); // Untuk delete
// router.get("*",userController.viewUser);
// Lalu export routernya 
module.exports = router;