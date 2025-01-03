const router = require("express").Router()
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization")
const UserController = require("../controllers/UserController")
const errorHandler = require("../middlewares/errorHandler")
const petRouter = require("./petRoute")
const shelterRouter = require("./shelterRoute")
const speciesRouter = require("./speciesRoute")
const AiController = require("../controllers/AiController")

// router.use("/pub", pubRouter)
router.post("/register", UserController.create)
router.post("/login", UserController.login)
router.post('/google-login', UserController.googleLogin)
router.post('/popular-animal', AiController.chatbot)

router.use(authentication)
router.use("/pets", petRouter)
router.use("/species", speciesRouter)
router.use("/shelters", shelterRouter)

router.use(errorHandler)

module.exports = router