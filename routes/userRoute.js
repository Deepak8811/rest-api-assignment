const express = require("express");
const router = express.Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require("../controllers/userController");

const validateUser = require("../middlewares/validateUser");
const authenticateUser = require("../middlewares/authMiddleware");



router.
    route("/getAllusers").get(authenticateUser, getAllUsers);


router.
    route("/getAllUsers/:id").get(authenticateUser, getUserById);


router.
    route("/create").post(validateUser, createUser);

router.
    route("/update/:id").put(authenticateUser, validateUser, updateUser);

router.
    route("/delete/:id").delete(authenticateUser, deleteUser);

module.exports = router;
