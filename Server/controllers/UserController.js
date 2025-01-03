const { compare } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { Shelter, User, Species, Pet } = require("../models");
const { OAuth2Client } = require('google-auth-library');
class UserController {
  static async create(req, res, next) {
    try {
      const { username, email, password, phoneNumber } = req.body;
      const user = await User.create({
        username,
        email,
        password,
        phoneNumber,
      });
      res.status(201).json({
        message: `Successfully create Account`,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
        },
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw { name: "Bad Request" };
      }

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        throw { name: "LoginError" };
      }

      if (!compare(password, user.password)) {
        throw { name: "LoginError" };
      }

      const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      const access_token = signToken(payload);

      res.status(200).json({
        access_token,
      });
    } catch (error) {
      next(error);
    }
  }

  static async googleLogin(req, res, next) {
    try {
        const { token } = req.headers
        const client = new OAuth2Client();

        const ticket = await client.verifyIdToken({
            idToken: token,
        });

        const payload = ticket.getPayload();
        const username = payload.name
        console.log(payload);
        
        const [user, created] = await User.findOrCreate({
            where: {
                email: payload.email
            },
            defaults: {
                username: username,
                email: payload.email,
                password: "password_google"
            },
            hooks: false
        })

        const access_token = signToken({
            id: user.id,
            username: user.username,
        })
        
        res.status(200).json({ access_token })
    } catch (error) {
      console.log("errrrrr",error);
      
        next(error)
    }
}

  static async profile(req, res, next) {
    try {
      const { id } = req.loginInfo; 

     
      const user = await User.findOne({
        where: { id },
        include: {
          model: Pet,  
          where: { userId: id },  
        },
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({
        message: 'Successfully fetched user profile',
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          pets: user.Pets, 
        },
      });
    } catch (error) {
      next(error);
    }
  }

}

module.exports = UserController;
