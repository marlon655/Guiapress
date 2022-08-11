const express = require("express");
const router = express.Router();
const User = require("./userModel");

router.get("/admin/users", (req, res) => {
    res.send("Listagem de usuários");
})

router.get("/admin/users/create",(req, res) => {
    res.render("admin/users/user");
})
module.exports = router;