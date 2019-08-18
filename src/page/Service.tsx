import React from "react";
import content from "./ServiceContent.md";

const dangerousHtml = {__html: content};

export default () => (
    <article className="page-content page-service">
        <h1 className="w3-text-teal">Services</h1>
        <div className="page-content">
            <div dangerouslySetInnerHTML={dangerousHtml}/>
        </div>
    </article>
);