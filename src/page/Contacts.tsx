import React from "react";
import content from "./ContactsContent.md";

const dangerousHtml = {__html: content};

export default () => (
    <div className="page-content page-contacts">
        <h1 className="w3-text-teal">Contacts</h1>
        <div className="page-content">
            <div dangerouslySetInnerHTML={dangerousHtml}/>
        </div>
    </div>
);