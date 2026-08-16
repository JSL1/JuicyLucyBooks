import React, { Component, useState, useEffect } from "react";


const AuthorsMain = () => {

    const [allAuthors, setAllAuthors] = useState([]);
    const [authorIds, setAuthorIds] = useState([1,2,3,4,5,6]);
    const [activeAuthor, setActiveAuthor] = useState({});
    const [allBooks, setAllBooks] = useState([]);
    const [publisherIds, setPublisherIds] = useState([]);
    const [authorBook, getAuthorBook] = useState({});
    
    useEffect(() => {
            fetch("http://localhost:5000/api/authors")
                .then(response => response.json())
                .then(data => {
                    const ids = data.map(a => a.authorid);
                    const uniqueAuthorIds = [...new Set(ids)];
                    setAllAuthors(data);
                    setAuthorIds(uniqueAuthorIds);
                });
            fetch("http://localhost:5000/api/books")
                .then(response => response.json())
                .then(data => setAllBooks(data));
        }, []);
    
        const assignAuthorToBook = (e) => {
            e.preventDefault();
        }

        return (
        <div className="container">
            <div className="update-all">
                <span>Assign author to book</span>
                <form id="assign-book-author">
                    <select id="assign-author-id">
                        {allAuthors.map(author => 
                            <option id={author.AUTHORID}>{author.AUTHORID} - {author.FNAME} {author.LNAME}</option>
                        )}
                    </select>
                    <select id="assign-book-id">
                        {allBooks.map(b => 
                            <option value={b.ISBN}>{b.ISBN} - {b.TITLE}</option>
                        )}
                    </select>
                    <input type="button" value="Save"></input>
                </form>
            </div>
            <div id="all-authors">
                {allAuthors.map( author => 
                <div className="update-book">
                    <form>
                        <span>Author Id# {author.id}</span>
                        <input type="text" name="update-fname" id="author-update-fname" placeholder={author.FNAME} />
                        <input type="text" name="update-lname" id="author-update-lname" placeholder={author.LNAME} />
                        <div className="update-buttons">
                            <button type="button" className="button-small">Save </button>
                            <button type="button" className="button-small">Delete </button>
                        </div>
                    </form>
                </div>
                )}
            </div>
        </div>
    );
}
export default AuthorsMain;
