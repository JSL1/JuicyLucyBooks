import React, { Component, useState } from "react";

const AuthorsMain = () => {
    const [allAuthors, setAllAuthors] = useState([
        {
            id: 1,
            firstname: 'Stephen',
            lastname: 'King'
        }
    ]);

    return (
        <div className="container">
            <div className="update-all">
                <span>Assign author to book</span>
                <form id="assign-book-author">
                    <select id="assign-author-id">
                        {allAuthors.map(author => 
                            <option id={author.id}>{author.id}</option>
                        )}
                    </select>
                    <select id="assign-book-id">
                        <option value="1">1</option>
                    </select>
                    <input type="button" value="Save"></input>
                </form>
            </div>
            <div id="all-authors">
                {allAuthors.map( author => 
                <div className="update-book">
                    <form>
                        <span>Author Id# {author.id}</span>
                        <input type="text" name="update-fname" id="author-update-fname" placeholder={author.firstname} />
                        <input type="text" name="update-lname" id="author-update-lname" placeholder={author.lastname} />
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
