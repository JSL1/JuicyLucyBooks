import express from 'express';
import { QueryTypes } from 'sequelize'; 
import sqlz from '../db.js';

const router = express.Router();

// GET ALL BOOKS
router.get('/books', async(req, res) => {
    try {
        const books = await sqlz.query("SELECT * FROM JL_BOOKS", {
            type: QueryTypes.SELECT
        });
        res.json(books);
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// uPDATE ALL BOOKS 
router.put('/books/all', async (req, res) => {
    const { COST, RETAIL, CATEGORY } = req.body;
    try {
        await sqlz.query(
            `UPDATE JL_BOOKS SET COST = :COST, RETAIL = :RETAIL, CATEGORY = :CATEGORY`,
            { 
                replacements: { COST, RETAIL, CATEGORY },
                type: QueryTypes.UPDATE
            }
        );
        res.json({ message: "all books updated successfully" });
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// UPDATE SINGLE BOOK BY ISBN
router.put('/books/:ISBN', async (req, res) => {
    const { ISBN } = req.params;
    const { COST, RETAIL, CATEGORY } = req.body;
    try {
        await sqlz.query(
            `UPDATE JL_BOOKS SET COST = :COST, RETAIL = :RETAIL, CATEGORY = :CATEGORY WHERE ISBN = :ISBN`,
            { 
                replacements: { ISBN, COST, RETAIL, CATEGORY },
                type: QueryTypes.UPDATE
            }
        );
        res.json({ message: "book updated successfully" });
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// REGISTER NEW BOOK (STORED PROCEDURE)
router.post("/books", async (req, res) => {
    const { ISBN, TITLE, PUBDATE, PUBID, COST, RETAIL, DISCOUNT, CATEGORY } = req.body;

    try {
        await sqlz.query(`
        BEGIN
            sp_Book_register(:isbn, :title, :pubdate, :pubid, :cost, :retail, :discount, :category);
        END;
        `, {
            replacements: { 
                isbn: ISBN, 
                title: TITLE, 
                pubdate: PUBDATE, 
                pubid: PUBID, 
                cost: COST, 
                retail: RETAIL, 
                discount: DISCOUNT, 
                category: CATEGORY 
            },
            type: QueryTypes.RAW
        });
        
        res.status(201).json({ message: "book registered successfully" });
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

router.delete('/books/:ISBN', async (req, res) => {
    const { ISBN } = req.params;
    try {
        await sqlz.query(
            `sp_delete_book(${ISBN})`,
            { 
                replacements: { ISBN },
                type: QueryTypes.DELETE,
            }
        );
        res.json({ message: "book deleted successfully" });
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

export default router;
