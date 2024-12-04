const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');
const authController = require('../controllers/authController');
const deleteProfileController = require('../controllers/deleteProfileController');
const usersDB = require('../model/users.json')

router.get('/', (req,res) => {
    res.status(200).json(usersDB)
})
router.post('/', registerController.handleNewUser);
router.post('/login', authController.handleLogin);
router.delete('/delete-account', deleteProfileController.deleteProfile);

module.exports = router;