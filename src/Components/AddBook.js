import React, { Component, useState, useEffect } from "react";


const AddBook = () => {

    const [allBooks, setAllBooks] = useState([]);
    const [publisherIds, setPublisherIds] = useState([]);
    const [activeBook, setActiveBook] = useState({});

    useEffect(() => {
        fetch(process.env.API_URL + "/api/books")
            .then(response => response.json())
            .then(data => {
                const ids = data.map(book => book.PUBID);
                const uniquePublisherIds = [...new Set(ids)];
                setAllBooks(data);
                setPublisherIds(uniquePublisherIds);
            });
    }, []);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setActiveBook(values => ({...values, [name]: value}));
    }

    const registerBook = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch(process.env.API_URL + "/api/books",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(activeBook)
                }
            );
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <main className="container ">
        
        <h2 className="pico-color-violet-500">Register Book</h2>
        <form id="book-register">
            <label for="isbn">Isbn</label>
            <input type="text" id="isbn" name="isbn" />
            <label for="Title">Title</label>
            <input type="text" id="title" name="title" onChange={handleChange}/>
            <label for="pubdate">Publish Date</label>
            <input type="date" name="pubdate" id="pubdate" aria-label="Date" onChange={handleChange}/>
            <label for="pubid">Publisher ID: </label>
            <select id="pubid" name="pubid" onChange={handleChange}>
                {publisherIds.map(id =>
                    <option value={id}>{id}</option>
                )}
            </select>
            <label for="cost">Cost</label>
            <input type="number" id="cost" name="cost" onChange={handleChange}/>
            <label for="retail">Retail</label>
            <input type="number" name="retail" id="retail" onChange={handleChange}/>
            <label for="category">Category</label>
            <input type="text" name="category" id="category" onChange={handleChange}/>
            <label for="discount">Discount</label>
            <input type="number" name="discount" id="discount" onChange={handleChange}/>
            <input type="submit" value="Register" onClick={registerBook} />
            <input type="reset" value="Cancel" />
        </form>
    </main>
    );
}

export default AddBook;