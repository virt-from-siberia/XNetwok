//Important_NOTE///: BACK END
const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../../models/User");

//TODO: @route  POST API/USERS
//TODO: @desc   Register USER
//TODO: @access PUBLIC
router.post(
    "/",
    [
        check("name", "Name is required")
            .not()
            .isEmpty(),
        check("email", "Please include valid email").isEmail(),
        check(
            "password",
            "Please enter a password with 6 or more characters"
        ).isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const { name, email, password } = req.body;

        try {
            ////TODO:  See if user exists
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({
                    errors: [{ msg: "User already exists" }]
                });
            }

            ////TODO: Get users gravatar
            const avatar = gravatar.url(email, {
                s: "200",
                r: "pg",
                d: "mm"
            });

            user = new User({
                name,
                email,
                avatar,
                password
            });

            ////TODO: Encrypt password
            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            ////TODO: Return JSONwetoken
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
