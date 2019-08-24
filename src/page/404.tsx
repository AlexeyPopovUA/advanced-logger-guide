import React from "react";

export default ({location}) => <>
    <section className="hero is-light">
        <div className="hero-body">
            <div className="container">
                <h1 className="title">404 Page not found</h1>
            </div>
        </div>
    </section>
    <section className="section page-content page-about">
        <div className="container">
            <div className="page-content content">
                <div>Sorry, this page is not available</div>
                <div>{location.pathname}</div>
            </div>
        </div>
    </section>
</>;