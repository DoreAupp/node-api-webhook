const express = require("express");
const app = express();

app.use(express.json());

// Shared data (in-memory)
let items = [
  { id: 1, name: "apple" },
  { id: 2, name: "banana" }
];

app.get("/", (req, res) =>
  res.send("API is running, yessirrrr 🫨")
);

// GET ALL
app.get("/api/items", (req, res) => {
  res.json(items);
});

// GET BY ID
app.get("/api/items/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = items.find(i => i.id === id);

  if (!item) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json(item);
});

// POST (Create)
app.post("/api/items", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  const newItem = {
    id: items.length ? items[items.length - 1].id + 1 : 1,
    name
  };

  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT (Update)
app.put("/api/items/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  const item = items.find(i => i.id === id);

  if (!item) {
    return res.status(404).json({ message: "Not found" });
  }

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  item.name = name;
  res.json(item);
});

// DELETE
app.delete("/api/items/:id", (req, res) => {
  const id = Number(req.params.id);
  const initialLength = items.length;

  items = items.filter(i => i.id !== id);

  if (items.length === initialLength) {
    return res.status(404).json({ message: "Not found" });
  }

  res.status(204).send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Listening on ${PORT}`)
);