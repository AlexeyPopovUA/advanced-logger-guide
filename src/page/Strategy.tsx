import React from "react";
import content from "./StrategyContent.md";

const dangerousHtml = {__html: content};

export default () => (
    <article className="page-content page-strategy">
        <h1 className="w3-text-teal">Strategy</h1>
        <div className="page-content">
            <div dangerouslySetInnerHTML={dangerousHtml}/>
        </div>
    </article>
);