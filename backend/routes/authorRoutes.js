import express from 'express';
import { QueryTypes } from 'sequelize'; 
import sqlz from '../db.js';

const router = express.Router();

router.get('/authors', async (req, res) => {
    try {
        const authors = await sqlz.query("SELECT * FROM JL_AUTHOR", {
            type: QueryTypes.SELECT
        });
        res.json(authors);
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

router.put('/authors/:AUTHORID', async (req, res) => {
    const { AUTHORID } = req.params;
    const { ISBN } = req.body;
    try {
        await sqlz.query(`
        BEGIN
            sp_assign_author(:AUTHORID, :ISBN);
        END;
        `, { 
            replacements: { AUTHORID, ISBN },
            type: QueryTypes.RAW
        });
        
        res.json({ message: "author assigned successfully" });
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

router.put('/authors/update/:AUTHORID', async (req, res) => {
    const { AUTHORID } = req.params;
    const { FNAME, LNAME } = req.body;
    try {
        await sqlz.query(
            `UPDATE JL_AUTHOR SET FNAME = :FNAME, LNAME = :LNAME WHERE AUTHORID = :AUTHORID`,
            { 
                replacements: { AUTHORID, FNAME, LNAME },
                type: QueryTypes.UPDATE
            }
        );
        res.json({ message: "author updated successfully" });
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

router.delete('/authors/:AUTHORID', async (req, res) => {
    const { AUTHORID } = req.params;
    try {
        await sqlz.query(
            `sp_delete_author(${AUTHORID})`,
            { 
                replacements: { AUTHORID },
                type: QueryTypes.DELETE
            }
        );
        res.json({ message: "author deleted successfully" });
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});


export default router;
