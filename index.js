const express = require("express");
const mongoose = require("mongoose");
const keys = require("./configs/keys");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieSession = require("cookie-session");

//mongoose.connect(keys.mongoURI);

const app = express();
app.use(cors());
app.use(bodyParser.json());

console.log("Mongol => " + keys.mongoURI);

mongoose.connect(keys.mongoURI);

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    keys: [keys.cookieKey],
  })
);

require("./routers/userRouter")(app);
require("./routers/scoreRouter")(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
