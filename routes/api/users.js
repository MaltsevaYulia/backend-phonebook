const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers/userControllers');
const { schemas } = require('../../db/models/usersModel');
const authenticate = require('../../middlewares/authenticate');
const { validateBody } = require('../../middlewares/validateBody');


module.exports = router;

router.post("/signup",validateBody(schemas.signupSchema) ,ctrl.signup);
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);
router.post("/logout", authenticate,ctrl.logout);
router.get("/current",authenticate, ctrl.getCurrent);