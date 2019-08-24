import React from "react";
import content from "./ContributionContent.md";

const dangerousHtml = {__html: content};

export default () => (
    <div className="page-content page-contacts">
        <h1 className="w3-text-teal">Contribution</h1>
        <div className="page-content">
            <div dangerouslySetInnerHTML={dangerousHtml}/>
        </div>
    </div>
);