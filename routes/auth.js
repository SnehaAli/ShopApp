const express = require('express');
// const { check } = require('express-validator/check');
const { check, body } = require('express-validator')

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);
    
router.post('/login',[
    body('email')
        .isEmail()
        .withMessage('Incorrect email.')
        .normalizeEmail(),
    body('password', 'Incorrect Password')
        .isLength({min: 5})
        .isAlphanumeric()
        .trim()
], 
authController.postLogin
);

router.post('/signup', [
    check('email')
    .isEmail()
    .withMessage('Invalid Email')
    .custom((value, {req}) => {
        // if(value === 'test@gmail.com') {
        //     throw new Error('Forbidden email address');
        // }
        // return true;
        return User.findOne({email: value})
        .then(userDoc => {
            if(userDoc) {
            return Promise.reject('Email already exist!');
            }
        });
    })
    .normalizeEmail(),
    body(
        'password',
        'Password should be numbers and text and atleast 5 characters.'
    )
    .isLength({min: 5})
    .isAlphanumeric()
    .trim(),
    body('confirmPassword')
    .trim()
    .custom((value, {req}) => {
        if(value !== req.body.password) {
            throw new Error('Password not matched');
        }
        return true;
    })
    ],
    authController.postSignup
    );

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword)

module.exports = router;