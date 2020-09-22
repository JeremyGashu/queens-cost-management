const express = require('express')
const UserController = require('../controller/user')
const AuthChcker = require('../middlewares/auth_user') 

const router = express.Router()

router.get('/',AuthChcker.managerAuthChecker, UserController.users_all)

router.post('/',AuthChcker.managerAuthChecker, UserController.create_user)

router.post('/login', UserController.login_user)

router.get('/logout', UserController.logout_user)

module.exports = router