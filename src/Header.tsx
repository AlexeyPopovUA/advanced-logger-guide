import {Link} from "react-router-dom";
import React from "react";

export default () => <nav className="navbar is-fixed-top is-dark" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
        <Link className="navbar-item" to="/">Advanced Logger</Link>

        <a role="button" className="navbar-burger" aria-label="menu"
           aria-expanded="false" onClick={toggleMenu}>
            <span aria-hidden="true"/>
            <span aria-hidden="true"/>
            <span aria-hidden="true"/>
        </a>
    </div>

    <div className="navbar-menu" id="navMenu">
        <div className="navbar-start" onClickCapture={onClickCapture}>
            <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">API</a>

                <div className="navbar-dropdown">
                    <Link className="navbar-item" to="/api/start">Getting started</Link>
                    <Link className="navbar-item" to="/api/strategy">Strategy</Link>
                    <Link className="navbar-item" to="/api/service">Service</Link>
                    <Link className="navbar-item" to="/api/grouping">Grouping</Link>
                </div>
            </div>
            <Link className="navbar-item" to="/releases">Releases</Link>
            <Link className="navbar-item" to="/contribution">Contribution</Link>
            <Link className="navbar-item" to="/contacts">Contacts</Link>
        </div>
    </div>
</nav>

const toggleMenu = e => {
    const navMenu = document.getElementById("navMenu");
    const burger = e.target.closest(".navbar-burger");

    burger.classList.toggle('is-active');
    navMenu.classList.toggle('is-active');
};

const onClickCapture = e => {
    if (e.target.classList.contains("navbar-item")) {
        const navMenu = document.getElementById("navMenu");
        const burger = document.querySelector(".navbar-burger");

        burger.classList.remove('is-active');
        navMenu.classList.remove('is-active');
    }
};