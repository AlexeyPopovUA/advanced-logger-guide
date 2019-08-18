import React from "react";
import content from "./StartContent.md";

const dangerousHtml = {__html: content};

export default () => (
    <article className="page-content page-start">
        <h1 className="w3-text-teal">Getting started</h1>
        <div className="page-content">
            <div dangerouslySetInnerHTML={dangerousHtml}/>
        </div>
    </article>
);