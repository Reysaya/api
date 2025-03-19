// Import necessary modules
const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Supabase
const supabaseUrl = process.env.SUPABASE_URL || "https://kvalsxfwesewceawuzse.supabase.co";
const supabaseKey =
  process.env.SUPABASE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2YWxzeGZ3ZXNld2NlYXd1enNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzNjY1NzEsImV4cCI6MjA1Nzk0MjU3MX0.EEWJhvLiFJ8G9PB6UoX9TCBnzwy1V73if0ElvGywcr4";

const supabase = createClient(supabaseUrl, supabaseKey);

// API routes
app.get("/products", async (req, res) => {
  const { data, error } = await supabase.from("products").select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.post("/products", async (req, res) => {
  const { title, description, image_url, fb_link } = req.body;
  const { data, error } = await supabase
    .from("products")
    .insert([{ title, description, image_url, fb_link }]);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, image_url, fb_link } = req.body;
  const { data, error } = await supabase
    .from("products")
    .update({ title, description, image_url, fb_link })
    .eq("id", id);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: "Product deleted successfully" });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
