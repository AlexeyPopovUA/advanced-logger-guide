import * as React from "react";

export default class About extends React.Component {
    public render() {
        return (
            <article className="page-content page-about">
                <h1 className="w3-text-teal">About</h1>
                <div className="page-content">
                    <h2>The idea</h2>
                    <p>The main idea of this module is to create an isomorphic log sending tool, that can be extended by internal/external plugins.<br/>
                        It has bundles for browser and nodejs environments.<br/>
                        It can be extended with custom strategy ("when to send logs") and service ("where to send logs"). See usage examples.<br/>
                        It does not restrict you with conventions, for example, existence of "logSeverity", "ErrorId" or "message" fields in log.<br/>
                        It supports any format of logs via custom serializer.</p>
                    <h2>Features</h2>
                    <ul>
                        <li>It works in browsers and nodejs</li>
                        <li>It is able to send single logs and bundles of them to an external logger</li>
                        <li>It supports different log sending strategies:</li>
                        <ul>
                            <li>interval (for example, every 10 seconds)</li>
                            <li>on request (only when you ask)</li>
                            <li>mixed ("interval" + "on request") (will be done soon)</li>
                            <li>on bundle size (for example, sends bundles of 100 logs)</li>
                            <li>instant (received 1 log -> sent 1 log)</li>
                        </ul>
                        <li>It is able to group duplicated logs in certain time interval (for rapid fire of the same logs)</li>
                        <li>It is not afraid of circular links in log objects</li>
                        <li>It supports custom format for logs (custom serializer)</li>
                        <li>It supports different remote logger endpoints (SumoLogic, Loggly and Elasticsearch). Who is the next? ᕙ(ಠ.ಠ)ᕗ</li>
                    </ul>
                    <h2>Runtime environment support</h2>
                    <p>Builds are generated as ES5 bundles for nodejs and browser environments.
                        <br/>NodeJS - tested on latest lts
                        <br/>Browser - all latest browsers + IE10, IE11 (fetch polyfill)</p>
                    <h2>Usage</h2>
                    <p>Please, find working examples for browser and nodejs environments in <i>/example</i> folder.</p>
                </div>
            </article>
        );
    }
}
