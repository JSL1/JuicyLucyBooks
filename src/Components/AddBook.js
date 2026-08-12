import React, { Component, useState, useEffect } from "react";


const AddBook = () => {
        
    const [publisherIds, getPublisherIds] = useState([1,2,3,4,5,6]);

    useEffect(() => {
        getBooks();
    }, []);

    const getBooks = async () => {

    }

    return (
        <main className="container ">
        
        <h2 className="pico-color-violet-500">Register Book</h2>
        <form id="book-register">
            <label for="isbn">Isbn</label>
            <input type="text" id="isbn" name="isbn" />
            <label for="Title">Title</label>
            <input type="text" id="title" name="title" />
            <label for="pubdate">Publish Date</label>
            <input type="date" name="pubdate" id="pubdate" aria-label="Date" />
            <label for="pubid">Publisher ID: </label>
            <select id="pubid" name="pubid">
                {publisherIds.map(id =>
                    <option value={id}>{id}</option>
                )}
            </select>
            <label for="cost">Cost</label>
            <input type="number" id="cost" name="cost" />
            <label for="retail">Retail</label>
            <input type="number" name="retail" id="retail" />
            <label for="category">Category</label>
            <input type="text" name="category" id="category" />
            <label for="discount">Discount</label>
            <input type="number" name="discount" id="discount" />
            <input type="submit" value="Register" />
            <input type="reset" value="Cancel" />
        </form>
    </main>
    );
}

export default AddBook;