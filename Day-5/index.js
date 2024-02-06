import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = new express();
app.use(express.json());


app.use((req, res, next) => {
    console.log("Request Data - ")
    console.log("Method type:", req.method);
    console.log("URL:", req.url);
    console.log("Params:", req.params);
    console.log("Queries:", req.query);
    console.log("Body:", req.body);
    next();
  });

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

let users = [
  { id: 1, name: "Mothe Rohit" },
  { id: 2, name: "Rithik Prasad" },
];

// GET method with query parameter
app.get("/user", (req, res) => {
  const userId = req.query.id;
  if (userId) {
    const user = users.find((user) => user.id == userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } else {
    res.json(users);
  }
});

// POST method with request body
app.post("/user", (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT method with query parameter and request body
app.put("/user", (req, res) => {
  const userId = req.query.id;
  if (userId) {
    const userIndex = users.findIndex((user) => user.id == userId);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...req.body };
      res.json(users[userIndex]);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } else {
    res.status(400).json({ error: "User ID is required" });
  }
});

// DELETE method with params
app.delete("/user/:id", (req, res) => {
  const userId = req.params.id;
  const userIndex = users.findIndex((user) => user.id == userId);
  if (userIndex !== -1) {
    const deletedUser = users.splice(userIndex, 1);
    res.json(deletedUser[0]);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});
