const { User, Pet, Shelter } = require("../models");

const authorization = async (req, res, next) => {
  try {
    const { userId, email, role } = req.loginInfo;

    if (role === "Admin") {
      // Validasi apakah Admin memiliki shelterId yang sesuai
      const user = await User.findByPk(userId);

      if (!user || !user.shelterId) {
        throw { name: "Forbidden" };
      }

      const { id } = req.params; // ID pet yang diakses
      const pet = await Pet.findByPk(id);

      if (!pet) {
        throw { name: "Not Found" };
      }

      if (pet.shelterId !== user.shelterId) {
        throw { name: "Forbidden" };
      }
    }

   
    next();
  } catch (error) {
    next(error);
  }
};

const authorizationAdmin = async (req, res, next) => {
  try {
    const { userId, email, role } = req.loginInfo;
    if (role === "User") {
      throw { name: `Forbidden` };
    }
    next()
  } catch (error) {
    console.log(error);
    
    next(error)
  }
}
module.exports = { authorization, authorizationAdmin }
