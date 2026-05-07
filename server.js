const express = require('express');

const app = express();
const db = require('./utility/dbManager');
app.use(express.json());

const fundRoutes = require('./routes/fundRoutes');
const sipRoutes = require("./routes/sipRoutes");
const investorRoutes = require("./routes/investorRoutes");


app.use('/api/funds', fundRoutes);
app.use("/api/sips", sipRoutes);
app.use("/api/investors", investorRoutes);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});