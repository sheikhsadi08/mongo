const express = require("express");
const connectDb = require("./db");
const authenticate = require("./middleware/authenticate");
const routes = require("./routes");

const app = express();
app.use(express.json());
app.use(routes);

app.get("/public", (req, res) => {
  res.status(200).json({ message: "i m a public route" });
});

app.get("/private", authenticate, async (req, res) => {
  console.log("i am user", req.user);
  res.status(200).json({ message: "i m a private route" });
});

app.use((err, req, res, next) => {
  console.log(err);
  const message = err.message ? err.message : "server error occured";
  const status = err.status ? err.status : 400;
  res.status(status).json({ message });
});

const port = 4000;

connectDb("mongodb://localhost:27017/attendance-db")
  .then(() => {
    console.log("database connected");
    app.listen(port, () => {
      console.log(`listening to port ${port}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
