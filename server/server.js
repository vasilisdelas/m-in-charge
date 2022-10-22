const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const port = process.env.PORT || 4000
//const uri = process.env.MONGODB_URI;
const markerRoute = require("./routes/markerRoute");
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");

dotenv.config()

app.use(express.json())
app.use(cors())

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB is connected')
  })
  .catch((err) => console.log(err))

  app.use('/api/markers', markerRoute)
  app.use('/api/users', userRoute)
  app.use('/api/admins', adminRoute)

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`)
})