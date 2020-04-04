//Important_NOTE///: BACK END
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator/check");
const User = require("../../models/User");

//NOTE: @route  GET API/auth
//NOTE:: @desc   TEST ROUTE
//NOTE:: @access Public

router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

//NOTE:: @route  POST API/AUTH
//NOTE:: @desc   Authenticate user & get token
//NOTE:: @access PUBLIC
router.post(
    "/",
    [
        check("email", "Введите правельный пароль").isEmail(),
        check("password", "Введите пароль").exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const { email, password } = req.body;

        try {
            ////NOTE::  See if user exists

            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({
                    errors: [{ msg: "Invalid Credentials" }]
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({
                    errors: [{ msg: "Invalid Credentials" }]
                });
            }

            ////NOTE:: Return JSONwetoken
            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                config.get("jwtSecret"),
                {
                    expiresIn: 360000
                },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }

        // res.send("User route");
    }
);

module.exports = router;
