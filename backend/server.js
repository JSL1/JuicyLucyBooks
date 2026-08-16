import express from 'express';
import cors from 'cors';
import sqlz from './db.js';
import bookRoutes from './routes/bookRoutes.js'

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", bookRoutes);

sqlz.authenticate()
    .then(() => {
        console.log("Oracle database connected");
    })
    .catch((err) => {
        console.error("Unable to connect to oracle:", err);
    });

app.get("/api/test", (req,res) => {
    res.json({message: "route works"});
});
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
