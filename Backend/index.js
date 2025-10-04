const express = require('express');

const app = express();
const Dbconnection= require("./Config/db");

Dbconnection();
// middleware to parse JSON bodies (useful if you extend the API later)
app.use(express.json());

const PORT =3000;
// Db connection
// simple health-check route
app.post('/', (req, res) => {
    res.send('Working fine');
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});