import * as React from "react";

export default class Strategy extends React.Component {
    public render() {
        return (
            <article className="page-content page-strategy">
                <h1 className="w3-text-teal">Strategy</h1>
                <div className="page-content">
                    <h2>The idea</h2>
                    <p>The main idea of this module is to create an isomorphic log sending tool, that can be extended by
                        internal/external plugins.
                        It has bundles for browser and nodejs environments.
                        It can be extended with custom strategy ("when to send logs") and service ("where to send
                        logs"). See usage examples.
                        It does not restrict you with conventions, for example, existence of "logSeverity", "ErrorId" or
                        "message" fields in log.</p>
                </div>
            </article>
        );
    }
}