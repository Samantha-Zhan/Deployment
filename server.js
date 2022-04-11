const express = require("express");
const fileUpload = require("express-fileupload");
const fs = require("fs-js");

const app = express();

app.use(fileUpload());

// Upload Endpoint
app.post("/upload", (req, res) => {
  console.log("running post");
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const file = req.files.file;

  file.mv(`${__dirname}/client/public/uploads/${file.name}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});

app.delete("/upload/:id", (req, res) => {
  fs.unlink(`${__dirname}/client/public/uploads/` + req.params.id, (err) => {
    if (err) {
      console.log("file does not exist");
      res.json({ message: "file does not exist" });
    } else {
      console.log(req.params.id + " was deleted");
      res.json({ message: req.params.id + " was deleted" });
    }
  });
});

app.listen(5000, () => console.log("Server Started..."));
