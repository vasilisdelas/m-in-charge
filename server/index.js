const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 4000;

const pinRoute = require('./routes/pins');
const userRoute = require('./routes/users');

require('dotenv').config();

app.use(express.json());
app.use(cors());

mongoose
    .connect(process.env.MONGODB_URI)
    .then( () => {
    console.log("MongoDB is connected.");
    })
    .catch(err => {
    console.log(`Error detected while connecting to MongoDB, error: ${err}`)
    })

app.use("/api/pins", pinRoute);
app.use("/api/users", userRoute);

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
})