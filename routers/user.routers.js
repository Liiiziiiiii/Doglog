const { Router } = require("express")

const router = new Router()
const stoneController = require(`../controller/user.controller`)

router.post('/create_user', stoneController.createUser)
router.post('/create_dog', stoneController.createDog)
router.post('/login', stoneController.loginUser);
router.get('/dogs', stoneController.getDogs)
router.get('/users', stoneController.getUser)
router.get('/user/:id', stoneController.getOneUser)

module.exports = router