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

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setActiveAuthor(values => ({...values, [name]: value}));
    }

    const registerAuthor = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/authors",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(activeAuthor)
                }
            );
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <main className="container">
        <h2 className="pico-color-violet-500">Register Author</h2>
        <form id="author-register">
            <label for="firstname">First Name</label>
            <input type="text" id="firstname" name="firstname" onChange={handleChange}/>
            <label for="lastname">Last Name</label>
            <input type="text" id="lastname" name="lastname" onChange={handleChange}/>
            <input type="submit" value="Register" onClick={registerAuthor} />
            <input type="reset" value="Cancel" />
        </form>
        </main>
    );
}

export default AddAuthor;

