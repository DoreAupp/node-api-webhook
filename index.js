const express = require("express");
const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send("API is running, yessirrrr 🫨"));

app.get("/api/items", (req, res) => {
  res.json([
    { id: 1, name: "apple" },
    { id: 2, name: "banana" }
  ]);
});

app.get("/api/items/:id", (req, res) => {
  const id = Number(req.params.id);
  const items = [
    { id: 1, name: "apple" },
    { id: 2, name: "banana" }
  ];
  const item = items.find(i => i.id === id);
  if (!item) return res.status(404).json({ message: "Not found" });
  res.json(item);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => console.log(`Listening on ${PORT}`));