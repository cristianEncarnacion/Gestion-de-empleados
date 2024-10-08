import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";

const port = process.env.PORT || 10000;

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to the database");
  }
});

app.post("/form", (req, res) => {
  const { nombre, edad, ciudad, cargo, experiencia } = req.body;
  db.query(
    "INSERT INTO form (nombre, edad, ciudad, cargo, experiencia) VALUES (?,?,?,?,?)",
    [nombre, edad, ciudad, cargo, experiencia],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/form", (req, res) => {
  db.query("SELECT * FROM form", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/form/:id", (req, res) => {
  const { id, nombre, edad, ciudad, cargo, experiencia } = req.body;
  db.query(
    "UPDATE form SET nombre=?, edad=?, ciudad=?, cargo=?, experiencia=? WHERE id=?",
    [nombre, edad, ciudad, cargo, experiencia, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.delete("/form/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM form WHERE id=?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(port, () => {
  console.log("Server running on port " + port);
});
