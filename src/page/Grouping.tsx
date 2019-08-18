import React from "react";
import content from "./GroupingContent.md";

const dangerousHtml = {__html: content};

export default () => (
    <article className="page-content page-grouping">
        <h1 className="w3-text-teal">Grouping</h1>
        <div className="page-content">
            <div dangerouslySetInnerHTML={dangerousHtml}/>
        </div>
    </article>
);