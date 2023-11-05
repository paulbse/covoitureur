const express = require("express") ;
const router = express.Router();

// controllers
const {
  signup,
  signin,
  forgotPassword,
  resetPassword,
  uploadImage
} = require("../controllers/auth");

router.get("/", (req, res) => {
  console.log("hello world from the API");
  return res.json({
    data: "hello world from the API",
  });
});

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/upload-image", uploadImage)

module.exports = router;
