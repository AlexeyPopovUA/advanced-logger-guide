import React from "react";

export default  (props: any) => {
    return (
        <div className="w3-overlay" onClick={props.handleClick} title="close side menu" id="myOverlay"/>
    );
};
