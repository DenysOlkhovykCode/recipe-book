import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const app = express();
app.use(cors());

const API_URL = process.env.API_URL || "";

app.get("/", async (req, res) => {
  const response = await axios.get(`${API_URL}search.php?s=`);
  res.json(response.data);
});

app.get("/recipes/ingredient/:ingredient", async (req, res) => {
  const ingredient = req.params.ingredient;
  const response = await axios.get(`${API_URL}/filter.php?i=${ingredient}`);
  res.json(response.data);
});

app.get("/recipes/country/:country", async (req, res) => {
  const country = req.params.country;
  const response = await axios.get(`${API_URL}/filter.php?a=${country}`);
  res.json(response.data);
});

app.get("/recipes/category/:category", async (req, res) => {
  const category = req.params.category;
  const response = await axios.get(`${API_URL}/filter.php?c=${category}`);
  res.json(response.data);
});

app.get("/recipe/:id", async (req, res) => {
  const id = req.params.id;
  const response = await axios.get(`${API_URL}/lookup.php?i=${id}`);
  res.json(response.data);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
