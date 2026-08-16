import express, { Router } from 'express';
import sqlz from '../db.js';

const router = express.Router();

router.get('/books', async(req, res) => {
    try {
        const [books] = await sqlz.query("SELECT * FROM JL_BOOKS");
        res.json(books);
    } catch(err) {
        console.error(err);
        res.status(500).json({
            error: err.message
        });
    }
});

router.put('/books/:id', async (req,res) => {
    const { ISBN } = req.params;
    const { COST, RETAIL, CATEGORY } = req.body;
    try{
        const [result] = await sqlz.query(`UPDATE JL_BOOKS SET COST = :COST, RETAIL = :RETAIL, CATEGORY = :CATEGORY WHERE ISBN = :ISBN`,
            { replacements: { ISBN, COST, RETAIL, CATEGORY }
        });
        res.json({ message: "book upated successfully"});
    } catch(err) {
        console.error(err);
        res.status(500).json({
            error: err.message
        });
    }
});


router.post("/books", async (req, res) => {
    const { ISBN, TITLE, PUBDATE, PUBID, COST, RETAIL, DISCOUNT, CATEGORY } = req.body;

    try {
        await sqlz.query(`
        BEGIN
            sp_Book_register(:isbn, :title, :pubdate, :pubid, :cost, :retail, :discount, :category);
        END;
        `, {
            replacements: { ISBN, TITLE, PUBDATE, PUBID, COST, RETAIL, DISCOUNT, CATEGORY }
        });
    } catch(err) {
        console.error(err);
        res.status(500).json({
            error: err.message
        });
    }
});


export default router;

