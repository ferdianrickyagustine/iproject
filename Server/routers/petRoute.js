const upload = require("../utils/multer");
const PetController = require("../controllers/PetController");
const {authorization, authorizationAdmin} = require("../middlewares/authorization");
const router = require("express").Router()
const middlewareUpload = upload.single('file')

// router.get("/", PetController.read)
router.get("/", PetController.read)
router.get("/:id", PetController.readDetail)
router.post("/:id/adopt", PetController.adopt);

router.post("/", authorizationAdmin, PetController.create)
router.put("/:id", authorization, PetController.update)
router.patch("/:id", authorization, middlewareUpload, PetController.patch)
router.delete("/:id", authorization, PetController.delete)

module.exports = router
