const express = require('express');
require('dotenv').config();
const sequelize = require('./config/db.config');
const { ErrorHandler } = require("./middleware/ErrorHandler");
const authRoute = require("./routes/auth.routes");
const helmet = require('helmet');
var cookieParser = require('cookie-parser')
const cors = require('cors');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.use(helmet());
app.use(express.json());
app.use(cookieParser())


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

const PORT = process.env.PORT;
app.use("/api/v1", authRoute);
// app.set('trust proxy', true);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database Connected Successfully!...");
    await sequelize.sync();
    app.listen(PORT, () =>
      console.log(`Server Running On http://localhost:${PORT}`)

    );
  } catch (error) {
    console.error("Error connecting to the Database: ", error.message);
  }
})();


app.use(ErrorHandler);
