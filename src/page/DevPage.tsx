import * as React from "react";

export default class DevPage extends React.Component {
    public render() {
        return (

            <div className="page-content page-dev">
                <h1 className="w3-text-teal">Dev Page</h1>
                <div className="page-content">
                    <p>Development page. Not for production!</p>
                    <div className="loading-overlay"><div className="loader"/></div>
                </div>
            </div>
        );
    }
}