const { Shelter, Pet } = require("../models");

class ShelterController {
  static async read(req, res, next) {
    try {
      const shelters = await Shelter.findAll();
      res.status(200).json({
        message: `Successfully read shelters`,
        shelters,
      });
    } catch (error) {
      next(error);
    }
  }

  static async readPetsByShelter(req, res, next) {
    try {
      const { id } = req.params;
      const shelters = await Shelter.findByPk(id, {
        include: [
          {
            model: Pet,
            where: { shelterId: id, status: "Available" },
          },
        ],
      });

      if (!shelters) {
        throw { name: "Not Found" };
      }

      res.status(200).json({
        message: `Successfully read all pet with shelter id ${id}`,
        data: shelters,
      });
    } catch (error) {
      console.log(error);

      next(error);
    }
  }
}

module.exports = ShelterController;
