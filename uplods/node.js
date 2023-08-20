const admin = require("firebase-admin");
const express = require("express");
const multer = require("multer");
const path = require("path");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://farmers-5f9f9-default-rtdb.firebaseio.com"
});

const db = admin.database();
const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/uploadProduct", upload.single("productImage"), (req, res) => {
  const { productName, productDescription, productPrice } = req.body;
  const productImage = req.file;
  const productRef = db.ref("products").push();
  productRef.set({
    productName,
    productDescription,
    productPrice,
    productImage: {
      originalname: productImage.originalname,
      mimetype: productImage.mimetype,
      filename: productImage.filename,
      path: path.join(__dirname, productImage.path)
    }
  });
  res.send("Product uploaded successfully!");
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
