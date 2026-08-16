import express, { Router} from 'express';
import sqlz from '../db.js';

const router = express.Router();

router.get('/authors', async (req, res) => {
    try {
        const [authors] = await sqlz.query("SELECT * FROM JL_AUTHOR");
        res.json(authors);
    } catch(err) {
        console.error(err);
        res.status(500).json({
            error: err.message
        });
    }
});


router.put('/authors/:id', async (req,res) => {
    const { AUTHORID } = req.params;
    const { ISBN } = req.body;
    try{
        const [result] = await sqlz.query(`sp_assign_author(:AUTHORID, :ISBN)`,
            { replacements: { AUTHORID, ISBN }
        });
    } catch(err) {
        console.error(err);
        res.status(500).json({
            error: err.message
        });
    }
});

export default router;

