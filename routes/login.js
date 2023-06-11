const router = require("express").Router();

const loginController = require("../controllers/loginControllers");

router.get("/", loginController.viewLogin);
//endpoint user
router.post("/", loginController.identifyUser);

//export route
module.exports = router;