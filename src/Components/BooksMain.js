import React, { Component, useState } from "react";

const BooksMain = () => {
    const [allBooks, setAllBooks] = useState([
        {
            isbn: 1,
            title: 'Default book 1',
            pubdate: Date.now(),
            pubid: 1,
            cost: 0.00,
            retail: 0.00,
            category: 'Misc'
        }
    ]);

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
                    <label>#{book.isbn} - {book.title}</label>
                    <label for="cost">Cost:</label>
                    <input type="number" name="cost" id="update-cost" placeholder={book.cost} />
                    <label for="retail">Retail:</label>
                    <input type="number" name="retail" id="update-retail" placeholder={book.retail} />
                    <label for="Category:">Category:</label>
                    <input type="text" name="category" id="update-category" placeholder={book.category} />
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