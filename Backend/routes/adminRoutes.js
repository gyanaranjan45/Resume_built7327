const router = require("express").Router();
const ctrl = require("../controllers/adminController");
const auth = require("../middleware/authMiddleware");

router.post("/login", ctrl.login);
router.get("/resumes", auth, ctrl.getResumes);
router.put("/resume/:id", auth, ctrl.updateResume);
router.delete("/resume/:id", auth, ctrl.deleteResume);

module.exports = router;
