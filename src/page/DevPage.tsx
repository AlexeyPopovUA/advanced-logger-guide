import React from "react";
import content from "./DevPageContent.md";

const dangerousHtml = {__html: content};

export default () => (
    <>
        <section className="hero is-light">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title">Dev Page</h1>
                </div>
            </div>
        </section>
        <section className="section page-content page-about">
            <div className="container">
                <div className="page-content content">
                    <p>Development page. Not for production!</p>
                    <div dangerouslySetInnerHTML={dangerousHtml}/>
                </div>
            </div>
        </section>
    </>
);