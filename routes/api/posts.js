const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const auth = require("../../middleware/auth");

const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

//Important_NOTE///:
//TODO: @route  POST API/posts
//TODO: @desc   Create a post
//TODO: @access Private
router.post(
    "/",
    [
        auth,
        [
            check("text", "Text is required")
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findById(req.user.id).select("-password");

            const newPost = new Post({
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            });

            const post = await newPost.save();
            res.json(post);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

//Important_NOTE///:
//TODO: @route  GET API/posts
//TODO: @desc   Get all posts
//TODO: @access Private

router.get("/", auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//Important_NOTE///:
//TODO: @route  GET API/posts/:id
//TODO: @desc   Get post by ID
//TODO: @access Private

router.get("/:id", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }

        res.json(post);
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            return res.status(404).json({ msg: "Post not found" });
        }
        res.status(500).send("Server Error");
    }
});

//Important_NOTE///:
//NOTE: @route  DELETE API/posts/:id
//NOTE: @desc   Delete a post
//NOTE: @access Private

router.delete("/:id", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }

        //NOTE:Check user
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "User not authorized" });
        }

        await post.remove();

        res.json({ msg: "Post removed" });
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            return res.status(404).json({ msg: "Post not found" });
        }
        res.status(500).send("Server Error");
    }
});

//Important_NOTE///:
//NOTE: @route  PUT API/posts/like/:id
//NOTE: @desc   Like a post
//NOTE: @access Private
router.put("/like/:id", auth, async (req, res) => {
    const post = await Post.findById(req.params.id);
    try {
    } catch (err) {
        console.error(500).send("Server Error");
    }
});

module.exports = router;
