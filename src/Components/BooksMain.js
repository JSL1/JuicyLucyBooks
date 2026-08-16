import { json } from "express";
import React, { Component, useState, useEffect } from "react";

const BooksMain = () => {
    const [allBooks, setAllBooks] = useState([
        {
            ISBN: 1,
            TITLE: 'Default book 1',
            PUBDATE: Date.now(),
            PUBID: 1,
            COST: 0.00,
            DISCOUNT: 0.00,
            CATEGORY: 'Misc'
        }
    ]);

    const [activeBook, setActiveBook] = useState({});

    useEffect(() => {
        fetch("http://localhost:5000/api/books")
            .then(response => response.json())
            .then(data => setAllBooks(data));
    }, []);

    const handleFormInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setActiveBook(values => ({...values, [name]: value}));
    }
    
    //update one book
    const updateBook = async () => {
        fetch(`http://localhost:5000/api/books/${activeBook.ISBN}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(activeBook)
        })
        .then(res => res.json()
    )
        .then(data => console.log(data));
    }

    //update all books
   /* const updateAllBooks = async () => {

    }*/

    return (
        <main className="container">
            <h2>All Books</h2>
            <div className="update-all">
                <span>Update All Books</span>
                <form id="update-all-books">
                    <input type="number" name="update-all-cost" id="update-all-cost" placeholder="Cost" />
                    <input type="number" name="update-all-retail" id="update-all-retail" placeholder="Retail" />
                    <input type="text" name="cupdate-all-category" id="update-all-category" placeholder="Category" />
                    <input type="button" value="Save" />
                </form>
            </div>
            {allBooks.map(book => 
                <div className="update-book">
                    <label>#{book.ISBN} - {book.TITLE}</label>
                    <label for="cost">Cost:</label>
                    <input type="hidden" name="isbn" value={book.ISBN} />
                    <input type="hidden" name="title" value={book.TITLE} />
                    <input type="hidden" name="pubdate" value={book.PUBDATE} />
                    <input type="hidden" name="pubid" value={book.PUBID} />
                    <input type="number" name="cost" id="update-cost" placeholder={book.COST} onChange={handleFormInput} />
                    <inpyt type="hidden" name="discount" value={book.DISCOUNT} />
                    <label for="retail">Retail:</label>
                    <input type="number" name="retail" id="update-retail" placeholder={book.RETAIL} onChange={handleFormInput} />
                    <label for="Category:">Category:</label>
                    <input type="text" name="category" id="update-category" placeholder={book.CATEGORY} onChange={handleFormInput} />
                    <div className="update-buttons">
                        <button type="button" className="button-small">Save </button>
                        <button type="button" className="button-small">Delete </button>
                    </div>
                </div>
            )}
        </main>
    );
}

export default BooksMain;