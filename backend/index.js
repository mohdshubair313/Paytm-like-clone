const express = require("express");
const app = express();
const mainRouter = require("./Route/index")
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/api/v1",mainRouter);

app.listen(8080, () => {
    console.log("Your are connected to the backend");
});

