const { Species, Pet } = require("../models");

class SpeciesController {
  static async read(req, res, next) {
    try {
      const species = await Species.findAll();
      res.status(200).json({
        message: `Successfully read species`,
        data: species,
      });
    } catch (error) {
      next(error);
    }
  }

  static async readPetsBySpecies(req, res, next) {
    try {
      const { id } = req.params;
      const species = await Species.findByPk(id, {
        include: {
          model: Pet,
          where: { speciesId: id, status: "Available" },
        },
      });
      if (!species) {
        throw { name: "Not Found" };
      }

      res.status(200).json({
        message: `Successfully read Pets with shelter id ${id}`,
        data: species,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = SpeciesController;
