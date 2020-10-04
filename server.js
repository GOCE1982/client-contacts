const express = require("express");
const path = require('path');
const connectDB = require("./config/db");

// Connect to database
const app = express();

// Init middleware (body-parser replacement)
app.use(express.json({ extended: false }));

connectDB();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5000"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use("/api/users", require("./routes/users"));
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/auth", require("./routes/auth"));

// Serve static assets in prod
if(process.env.NODE_ENV === 'production') {
  app.use(express.static("client/build"));

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname__, 'client', 'build', 'index.html')));
}


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`The server is running on port ${PORT}`));
