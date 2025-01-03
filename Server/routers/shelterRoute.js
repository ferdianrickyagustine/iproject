const ShelterController = require("../controllers/ShelterController")
const router = require("express").Router()

router.get("/", ShelterController.read)
router.get("/:id/pets", ShelterController.readPetsByShelter)

module.exports = router