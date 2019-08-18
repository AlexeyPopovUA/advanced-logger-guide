import React from "react";
import content from "./AboutContent.md";

const dangerousHtml = {__html: content};

export default () => (
    <article className="page-content page-about">
        <h1 className="w3-text-teal">About</h1>
        <div className="page-content">
            <div dangerouslySetInnerHTML={dangerousHtml}/>
        </div>
    </article>
);