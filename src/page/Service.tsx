import React from "react";
import content from "./ServiceContent.md";

const dangerousHtml = {__html: content};

export default () => (
    <>
        <section className="hero is-light">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title">Services</h1>
                </div>
            </div>
        </section>
        <section className="section page-content page-about">
            <div className="container">
                <div className="page-content content">
                    <div dangerouslySetInnerHTML={dangerousHtml}/>
                </div>
            </div>
        </section>
    </>
);