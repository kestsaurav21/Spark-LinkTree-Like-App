const express = require('express');
const { createUser, loginUser, getUser, updateUser } = require('../controllers/user.controller');
const {isAuth} = require('../middleware/auth');


const router = express.Router();


router.post('/signup', createUser);
router.post('/login', loginUser);
router.get('/user', isAuth, getUser);
router.put("/update", isAuth, updateUser);



module.exports = router;

