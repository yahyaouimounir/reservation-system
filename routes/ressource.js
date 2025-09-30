const express = require ("express");
const router = express.Router();
const ressourceCtrl = require ("../controllers/ressource");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.post("/create", auth, admin, ressourceCtrl.createRessource);
router.get("/allressources", auth, admin,ressourceCtrl.getAllRessources); 
router.get("/:id", auth, ressourceCtrl.getressource);
router.put("/:id", auth, ressourceCtrl.modifyRessource);
router.delete("/:id", auth, admin, ressourceCtrl.deleteRessource);
module.exports = router;