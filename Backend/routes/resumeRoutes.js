const router = require("express").Router();
const ctrl = require("../controllers/resumeController");

router.post("/save", ctrl.saveResume); // ✅ IMPORTANT
router.post("/download-protected", ctrl.downloadProtected);
router.post("/email", ctrl.emailResume);

module.exports = router;
