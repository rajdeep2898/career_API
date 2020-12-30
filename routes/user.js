const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

// const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUser, getUserBySlug, returnUser } = require("../controllers/user");

router.param("slug", getUserBySlug);

router.get(
  "/search",
  [check("text", "name must be at least 3 chars long").isLength({ min: 3 })],
  getUser
);
router.get("/profile/:slug", returnUser);
module.exports = router;
