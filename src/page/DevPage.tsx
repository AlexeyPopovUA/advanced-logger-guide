import React from "react";
import content from "./DevPageContent.md";

const dangerousHtml = {__html: content};

export default () => (
    <div className="page-content page-dev">
        <h1 className="w3-text-teal">Dev Page</h1>
        <div className="page-content">
            <p>Development page. Not for production!</p>
            <div dangerouslySetInnerHTML={dangerousHtml}/>
        </div>
    </div>
);
