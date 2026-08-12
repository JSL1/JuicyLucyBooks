import React, { Component } from "react";
import { Link } from "react-router-dom";

const Navitem = (props) => {
    return (
        <div className='nav-item'>
            <li>
                <Link to={props.to}>{props.name}</Link>
            </li>
        </div>
    );
}


const Header = () => {
    return (
        <header>
            <div>
                <span className="logo">Juicy Lucy's Books</span>
            </div>
            <nav>
                <ul>
                    <Navitem to="./" name="Home" />
                    <Navitem to="./addbook" name="Register Book" />
                    <Navitem to="./books" name="Books" />
                    <Navitem to="./addauthor" name="Register Author" />
                    <Navitem to="./authors" name="Authors" />
                </ul>
            </nav>
        </header>
    );
}

export default Header;