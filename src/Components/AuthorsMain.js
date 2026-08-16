import React, { Component, useState, useEffect } from "react";


const AuthorsMain = () => {

    const [allAuthors, setAllAuthors] = useState([]);
    const [authorIds, setAuthorIds] = useState([1,2,3,4,5,6]);
    const [activeAuthor, setActiveAuthor] = useState({});
    const [allBooks, setAllBooks] = useState([]);
    const [publisherIds, setPublisherIds] = useState([]);
    const [authorBook, setAuthorBook] = useState({});
    
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
    

        const handleChangAb = (e) => {
            const name = e.target.name;
            const value = e.target.value;
            setAuthorBook(values => ({...values, [name]: value}));
        }


        const assignAuthorToBook = async (e) => {
            e.preventDefault();
            fetch(`http://localhost:5000/api/authors/${authorBook.AUTHORID}`, {
                method: 'PUT',
                headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(authorBook)
        })
            .then(res => res.json())
            .then(data => console.log(data));
        }

        return (
        <div className="container">
            <div className="update-all">
                <span>Assign author to book</span>
                <form id="assign-book-author">
                    <select id="assign-author-id" onChange={handleChangAb}>
                        {allAuthors.map(author => 
                            <option id={author.AUTHORID}>{author.AUTHORID} - {author.FNAME} {author.LNAME}</option>
                        )}
                    </select>
                    <select id="assign-book-id" onChange={handleChangAb}>
                        {allBooks.map(b => 
                            <option value={b.ISBN}>{b.ISBN} - {b.TITLE}</option>
                        )}
                    </select>
                    <input type="button" value="Save" onClick={assignAuthorToBook}></input>
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
