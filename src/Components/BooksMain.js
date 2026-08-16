import React, { useState, useEffect } from "react";

const BooksMain = () => {
    const [allBooks, setAllBooks] = useState([
        {
            ISBN: 1,
            TITLE: 'Default book 1',
            PUBDATE: Date.now(),
            PUBID: 1,
            COST: 0.00,
            RETAIL: 0.00,
            DISCOUNT: 0.00,
            CATEGORY: 'Misc'
        }
    ]);

    const [updateParams, setUpdateParams] = useState({ COST: '', RETAIL: '', CATEGORY: '' });

    const fetchBooks = () => {
        fetch("http://localhost:5000/api/books")
            .then(res => res.json())
            .then(data => setAllBooks(data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleRowInputChange = (isbn, field, value) => {
        setAllBooks(allBooks.map(book => 
            book.ISBN === isbn ? { ...book, [field]: value } : book
        ));
    };

    const handleUpdateParams = (e) => {
        setUpdateParams({ ...updateParams, [e.target.name]: e.target.value });
    };
    
    const updateBook = async (book) => {
        try {
            const res = await fetch(`http://localhost:5000/api/books/${book.ISBN}`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    COST: book.COST,
                    RETAIL: book.RETAIL,
                    CATEGORY: book.CATEGORY
                })
            });
            const data = await res.json();
            alert("book updated successfully");
            fetchBooks();
        } catch (err) {
            console.error(err);
        }
    };

    const updateAllBooks = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/books/all`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updateParams)
            });
            const data = await res.json();
            alert("all books updated successfully");
            fetchBooks();
        } catch (err) {
            console.error(err);
        }
    };

    const deleteBook = async (isbn) => {
        if (!window.confirm("Are you sure you want to delete this book?")) return;
        try {
            const res = await fetch(`http://localhost:5000/api/books/${isbn}`, {
                method: 'DELETE'
            });
            const data = await res.json();
            alert("book deleted successfully");
            fetchBooks();
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <main className="container">
            <h2>All Books</h2>
            
            <div className="update-all">
                <span>Update All Books</span>
                <form id="update-all-books">
                    <input type="number" name="COST" placeholder="Cost" value={updateParams.COST} onChange={handleUpdateParams}/>
                    <input type="number" name="RETAIL" placeholder="Retail" value={updateParams.RETAIL} onChange={handleUpdateParams}/>
                    <input type="text" name="CATEGORY" placeholder="Category" value={updateParams.CATEGORY} onChange={handleUpdateParams}/>
                    <button type="button" onClick={updateAllBooks}>Save All</button>
                </form>
            </div>

            {allBooks.map(book => (
                <div className="update-book" key={book.ISBN}>
                    <label>#{book.ISBN} - {book.TITLE}</label>
                    
                    <label htmlFor={`cost-${book.ISBN}`}>Cost:</label>
                    <input 
                        type="number" 
                        id={`cost-${book.ISBN}`}
                        placeholder={book.COST} 
                        value={book.COST || ''} 
                        onChange={(e) => handleRowInputChange(book.ISBN, 'COST', e.target.value)} 
                    />
                    
                    <label htmlFor={`retail-${book.ISBN}`}>Retail:</label>
                    <input 
                        type="number" 
                        id={`retail-${book.ISBN}`}
                        placeholder={book.RETAIL} 
                        value={book.RETAIL || ''} 
                        onChange={(e) => handleRowInputChange(book.ISBN, 'RETAIL', e.target.value)} 
                    />
                    
                    <label htmlFor={`category-${book.ISBN}`}>Category:</label>
                    <input 
                        type="text" 
                        id={`category-${book.ISBN}`}
                        placeholder={book.CATEGORY} 
                        value={book.CATEGORY || ''} 
                        onChange={(e) => handleRowInputChange(book.ISBN, 'CATEGORY', e.target.value)} 
                    />
                    
                    <div className="update-buttons">
                        <button type="button" className="button-small" onClick={() => updateBook(book)}>Save</button>
                        <button type="button" className="button-small" onClick={() => deleteBook(book.ISBN)}>Delete</button>
                    </div>
                </div>
            ))}
        </main>
    );
}

export default BooksMain;
