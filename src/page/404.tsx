import React from "react";

export default ({location}) => <div className="page">
    <div>Sorry, this page is not available</div>
    <div>{location.pathname}</div>
</div>;