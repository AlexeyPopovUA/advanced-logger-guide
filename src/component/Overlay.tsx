import * as React from "react";

const Overlay = (props: any) => {
    return (
        <div className="w3-overlay" onClick={props.handleClick} title="close side menu" id="myOverlay"/>
    );
};

export default Overlay;