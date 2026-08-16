import React, { Component, useState, useEffect } from "react";


const AuthorsMain = () => {

    const [allAuthors, setAllAuthors] = useState([]);
    const [authorIds, setAuthorIds] = useState([1,2,3,4,5,6]);
    const [activeAuthor, setActiveAuthor] = useState({});
    const [allBooks, setAllBooks] = useState([]);
    const [publisherIds, setPublisherIds] = useState([]);
    const [authorBook, setAuthorBook] = useState({});
    
    const fetchAuthors = () => {
        fetch(process.env.API_URL + "/api/authors")
                .then(response => response.json())
                .then(data => {
                    const ids = data.map(a => a.AUTHORID); // Fixed casing to match uppercase DB keys
                    const uniqueAuthorIds = [...new Set(ids)];
                    setAllAuthors(data);
                    setAuthorIds(uniqueAuthorIds);
        });
    }

    useEffect(() => {
            fetchAuthors();
            fetch(process.env.API_URL + "/api/books")
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
            fetch(`${process.env.API_URL}/api/authors/${authorBook.AUTHORID}`, {
                method: 'PUT',
                headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ISBN: authorBook.ISBN }) // Send just the expected body property
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                alert("Author assigned successfully");
            });
        }

        const saveAuthor = async (author) => {
            fetch(`${process.env.API_URL}/api/authors/update/${author.AUTHORID}`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    FNAME: author.FNAME,
                    LNAME: author.LNAME
                })
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                alert("Author name updated successfully");
            })
            .catch(err => console.error(err));
        }
        
        const deleteAuthor = async (authorId) => {
            if (!window.confirm("Are you sure you want to delete this author?")) return;

            fetch(`http://localhost:5000/api/authors/${authorId}`, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                alert("Author deleted successfully");
                fetchAuthors();
            })
            .catch(err => console.error(err));
        }

        return (
        <div className="container">
            <div className="update-all">
                <span>Assign author to book</span>
                <form id="assign-book-author">
                    <select id="assign-author-id" name="AUTHORID" onChange={handleChangAb} value={authorBook.AUTHORID || ''}>
                        <option value="">-- Select Author --</option>
                        {allAuthors.map(author => 
                            <option key={author.AUTHORID} value={author.AUTHORID}>{author.AUTHORID} - {author.FNAME} {author.LNAME}</option>
                        )}
                    </select>
                    <select id="assign-book-id" name="ISBN" onChange={handleChangAb} value={authorBook.ISBN || ''}>
                        <option value="">-- Select Book --</option>
                        {allBooks.map(b => 
                            <option key={b.ISBN} value={b.ISBN}>{b.ISBN} - {b.TITLE}</option>
                        )}
                    </select>
                    <input type="button" value="Save" onClick={assignAuthorToBook}></input>
                </form>
            </div>
            <div id="all-authors">
                {allAuthors.map( author => 
                <div className="update-book" key={author.AUTHORID}>
                    <form>
                        <span>Author Id# {author.AUTHORID}</span>
                        <input type="text" name="update-fname" id="author-update-fname" placeholder={author.FNAME} />
                        <input type="text" name="update-lname" id="author-update-lname" placeholder={author.LNAME} />
                        <div className="update-buttons">
                            <button type="button" className="button-small" onClick={() => saveAuthor(author)}>Save </button>
                            <button type="button" className="button-small" onClick={() => deleteAuthor(author.AUTHORID)}>Delete </button>
                        </div>
                    </form>
                </div>
                )}
            </div>
        </div>
    );
}
export default AuthorsMain;
