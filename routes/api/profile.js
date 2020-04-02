const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

//Important_NOTE///: @route  GET api/profile/me
//NOTE: @desc   Get current users profile
//NOTE: @access Private

router.get("/me", auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.user.id
        }).populate("user", ["name", "avatar"]);

        if (!profile) {
            return res
                .status(400)
                .json({ msg: "There is no profile for this user" });
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

//:Important_NOTE///: @route  POST api/profile/
//NOTE: @desc   Create or Update user profile
//NOTE: @access Private
router.post(
    "/",
    [
        auth,
        [
            check("status", "Status is required")
                .not()
                .isEmpty(),
            check("skills", "Skills is required")
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin,
            vk,
            odnoklassniky
        } = req.body;

        //NOTE: Build profile object

        const profileFields = {};
        profileFields.user = req.user.id;

        if (company) {
            profileFields.company = company;
        }
        if (location) {
            profileFields.location = location;
        }
        if (bio) {
            profileFields.bio = bio;
        }
        if (status) {
            profileFields.status = status;
        }
        if (company) {
            profileFields.company = company;
        }
        if (githubusername) {
            profileFields.githubusername = githubusername;
        }
        if (skills) {
            profileFields.skills = skills.split(",").map(skill => skill.trim());
        }

        //::Important///:: Build Social object
        profileFields.social = {};

        if (youtube) {
            profileFields.social.youtube = youtube;
        }
        if (twitter) {
            profileFields.social.twitter = twitter;
        }
        if (linkedin) {
            profileFields.social.linkedin = linkedin;
        }
        if (instagram) {
            profileFields.social.instagram = instagram;
        }
        if (vk) {
            profileFields.social.vk = vk;
        }
        if (odnoklassniky) {
            profileFields.social.odnoklassniky = odnoklassniky;
        }
        if (facebook) {
            profileFields.social.facebook = facebook;
        }

        try {
            let profile = await Profile.findOne({
                user: req.user.id
            });

            if (profile) {
                //NOTE: Update
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                );

                return res.json(profile);
            }

            //NOTE: Create
            profile = new Profile(profileFields);

            await profile.save();
            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

//Important_NOTE///: @route  GET api/profile/
//NOTE: @desc   GET all profiles
//NOTE: @access Public
router.get("/", async (req, res) => {
    try {
        const profiles = await Profile.find().populate("user", [
            "name",
            "avatar"
        ]);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//Important_NOTE///: @route  GET api/profile/user/:user_id
//NOTE:              @desc   GET profile by user id
//NOTE:              @access Public
router.get("/user/:user_id", async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.params.user_id
        }).populate("user", ["name", "avatar"]);

        if (!profile) {
            return res.status(400).json({ msg: "Profile not found" });
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if (err.kind == "ObjectId") {
            return res.status(400).json({ msg: "Profile not found" });
        }
        res.status(500).send("Server Error");
    }
});

//Important_NOTE///:  @route  DELETE api/profile/
//NOTE:               @desc   DELETE profile, user & post
//NOTE:               @access Private
router.delete("/", auth, async (req, res) => {
    try {
        //NOTE: Remove users posts

        //NOTE: Remove profile

        await Profile.findOneAndRemove({ user: req.user.id });

        //NOTE: Remove user

        await User.findOneAndRemove({ _id: req.user.id });

        res.json({ msg: "User deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//Important_NOTE///:  @route  PUT api/profile/
//NOTE:               @desc   Add profile experience
//NOTE:               @access Private
router.put(
    "/experience",
    [
        auth,
        [
            check("title", "Title is required")
                .not()
                .isEmpty(),
            check("company", "Company is required")
                .not()
                .isEmpty(),
            check("from", "From date is required")
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        } = req.body;

        const newExp = {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        };

        try {
            const profile = await Profile.findOne({ user: req.user.id });

            profile.experience.unshift(newExp);

            await profile.save();

            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

//Important_NOTE///:  @route  DELETE api/profile/:exp_id
//NOTE:               @desc   Delete  experience from profile
//NOTE:               @access Private
router.delete("/experience/:exp_id", auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        //NOTE: Get remove index

        const removeIndex = profile.experience
            .map(item => item.id)
            .indexOf(req.params.exp_id);

        profile.experience.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//Important_NOTE///:  @route  PUT api/profile/education
//NOTE:               @desc   Add profile education
//NOTE:               @access Private
router.put(
    "/education",
    [
        auth,
        [
            check("school", "School is required")
                .not()
                .isEmpty(),
            check("degree", "Degree is required")
                .not()
                .isEmpty(),
            check("fieldofstudy", "Field of study is required")
                .not()
                .isEmpty(),
            check("from", "From date is required")
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        } = req.body;

        const newEdu = {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        };

        try {
            const profile = await Profile.findOne({ user: req.user.id });

            profile.education.unshift(newEdu);

            await profile.save();

            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

//Important_NOTE///:  @route  DELETE api/profile/education/:edu_id
//NOTE:               @desc   Delete  education from profile
//NOTE:               @access Private
router.delete("/education/:edu_id", auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        //NOTE: Get remove index

        const removeIndex = profile.education
            .map(item => item.id)
            .indexOf(req.params.edu_id);

        profile.education.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
