const { Pet, Shelter, Species } = require("../models");
const imagekit = require("../utils/imagekit");

class PetController {
  static async create(req, res, next) {
    try {
      const { userId } = req.loginInfo;
      console.log(userId);
      
      const { name, age, breed, description, imageUrl, speciesId } = req.body;
      
      const pet = await Pet.create({
        name,
        age,
        breed,
        description,
        imageUrl,
        speciesId: +speciesId,
        shelterId: +userId
      });
      res.status(201).json({
        message: `Successfully create new Pet`,
        data: pet,
      });
    } catch (error) {
      console.log(error);
      
      next(error);
    }
  }

  static async read(req, res, next) {
    try {
      let paramsQuery = {};
      const { filter } = req.query;

      if (filter) {
        paramsQuery.where = {
          speciesId: filter,
        };
      }
      const pets = await Pet.findAll({
        where: {
          ...paramsQuery.where,
          status: 'Available',
          userId: null,
        },
        include: [
          {
            model: Shelter,
          },
          {
            model: Species,
          },
        ],
      });
      res.status(200).json({
        message: `Successfully read Pet`,
        data: pets,
      });
    } catch (error) {
      next(error);
    }
  }

  static async readDetail(req, res, next) {
    try {
      const { id } = req.params;
      const pet = await Pet.findByPk(id);

      if (!pet) {
        throw { name: "Not Found", id };
      }

      res.status(200).json({
        message: `Successfully read Pet detail with id ${pet.id}`,
        data: pet,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const pet = await Pet.findByPk(id);
      if (!pet) {
        throw { name: "Not Found", id };
      }
      const { name, age, breed, description, imageUrl, speciesId } = req.body;

      await pet.update({
        name,
        age,
        breed,
        description,
        imageUrl,
        speciesId,
      });
      res.status(200).json({
        message: `Successfully update post with id ${id}`,
        data: pet,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const pet = await Pet.findByPk(id);
      if (!pet) {
        throw { name: "Not Found" };
      }
      await pet.destroy();

      res.status(200).json({
        message: `${pet.name} success to delete`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async patch(req, res, next) {
    try {
      const imageBase64 = req.file.buffer.toString("base64");
      const result = await imagekit.upload({
        file: imageBase64,
        fileName: req.file.originalname,
      });

      const { id } = req.params;
      const pet = await Pet.findByPk(id);

      if (!pet) {
        throw { name: "Not Found", id };
      }

      await pet.update({
        imageUrl: result.url,
      });

      res.status(200).json({
        message: `Successfully patch image with id ${id}`,
        data: pet,
      });
    } catch (error) {
      next(error);
    }
  }

  static async adopt(req, res, next) {
    try {
      const { id } = req.params;
      const { userId } = req.loginInfo; 

      const pet = await Pet.findByPk(id);

      if (!pet) {
        return res.status(404).json({
          message: "Pet not found",
        });
      }

      if (pet.userId) {
        return res.status(400).json({
          message: "This pet has already been adopted by another user!",
        });
      }

      pet.userId = userId;
      pet.status = "adopted";
      await pet.save();

      res.status(200).json({
        message: `Successfully adopted the pet ${pet.name}`,
        pet: pet,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PetController;
