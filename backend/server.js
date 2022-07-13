const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
// app.use('/', require('./routes/<folder_path>/file_name_without_extension'))
app.use("/", require("./routes"));
app.use("/searchbooks", require("./routes"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..frontend/build/index.html"));
  });
}

// app.use(cors(), function(req, res, next) {
//   req.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });



// TODO place this in env.MONGO_URI and set up accordingly
const mongo_uri = "mongodb+srv://admin:Admin123@b00904831cluster.hvihfkn.mongodb.net/Tutorial6?retryWrites=true&w=majority";
// connect to db
mongoose.connect(mongo_uri).then(() => {
    // app.listen(3000);
    app.listen(process.env.PORT || 4000,
        () => console.log("Server is running on port", process.env.PORT || 4000));
}).catch((err) => {
    console.error("error found when connecting to mongo db atlas");
})


// const PORT = process.env.PORT || 4000;
// app.listen(PORT, console.log(`Server running on port ${PORT}`));
