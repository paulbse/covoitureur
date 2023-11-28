const express = require("express") ;
const router = express.Router();


const {
  createGroupe,
} = require("../controllers/group");

router.use((req, res, next) => {
  console.log('Requête reçue :', req.method, req.url, req.body);
  next();
});

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
router.post('/new_group', createGroupe);

module.exports = router;
