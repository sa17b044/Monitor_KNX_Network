const Router = require("express");
const router = Router();
const Users = require("../models/users_schema");
const jwt = require("jsonwebtoken");
router.post("/login", (req, res, next) => {
    console.log(req.body)
    Users.findOne({
        username: req.body.username
    }, (err, user) => {
        if (!user) {
            console.log("User wrong");
            return (
                res.status(401).json({
                    error: "Username wrong",
                })
            );
        }
        if (user.password !== req.body.password) {
            console.log("Password wrong");
            return res.status(401).json({
                error: "Password wrong",
            });
        }
        let token = jwt.sign({
            userId: user._id
        }, "secretkey");
        return res.status(200).json({
            msg: "succes",
            token: token,
            role: user.role
        });
    });
});

module.exports = router;