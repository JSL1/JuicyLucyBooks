import React, { Component, useState, useEffect } from "react";

const AddAuthor = () => {

    const [allAuthors, setAllAuthors] = useState([]);
    const [authorIds, setAuthorIds] = useState([1,2,3,4,5,6]);
    const [activeAuthor, setActiveAuthor] = useState({});

    useEffect(() => {
            fetch("http://localhost:5000/api/authors")
                .then(response => response.json())
                .then(data => {
                    const ids = data.map(a => a.authorid);
                    const uniqueAuthorIds = [...new Set(ids)];
                    setAllAuthors(data);
                    setAuthorIds(uniqueAuthorIds);
                });
        }, []);

    return (
        <main className="container">
        <h2 className="pico-color-violet-500">Register Author</h2>
        <form id="author-register">
            <label for="firstname">First Name</label>
            <input type="text" id="firstname" name="firstname" />
            <label for="lastname">Last Name</label>
            <input type="text" id="lastname" name="lastname" />
            <input type="submit" value="Register" />
            <input type="reset" value="Cancel" />
        </form>
        </main>
    );
}

export default AddAuthor;

