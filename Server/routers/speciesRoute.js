const SpeciesController = require("../controllers/SpeciesController")
const router = require("express").Router()

router.get("/", SpeciesController.read)
router.get("/:id/pets", SpeciesController.readPetsBySpecies)

module.exports = router