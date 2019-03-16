import React from "react";
import {highlight, languages} from "prismjs";

export default () => (
    <article className="page-content page-strategy">
        <h1 className="w3-text-teal">Strategy</h1>
        <div className="page-content">
            <h2>Strategies</h2>
            <p>Strategies are components that "know" when is it right time to send logs.
                There are next strategies available:</p>
            <ul>
                <li>InstantStrategy</li>
                <li>OnBundleSizeStrategy</li>
                <li>OnIntervalStrategy</li>
                <li>OnRequestStrategy</li>
            </ul>

            <h3>InstantStrategy</h3>
            <p>Does not require parameters. It just sends the log as soon as it appears in logger.</p>
            <pre className="code-snippet" dangerouslySetInnerHTML={{__html: html1}}/>

            <h3>OnBundleSizeStrategy</h3>
            <p>Can accept a configuration object with an optional "maxBundle" value, which determines what is a
                maximal amount of logs it should collect before sending to the service. Default number is
                100.</p>
            <pre className="code-snippet" dangerouslySetInnerHTML={{__html: html2}}/>

            <h3>OnIntervalStrategy</h3>
            <p>Can accept a configuration object with an optional "interval" value, which determines what is a
                time interval for collecting logs before sending them to the service. Default number is
                15000.</p>
            <pre className="code-snippet" dangerouslySetInnerHTML={{__html: html3}}/>

            <h3>OnRequestStrategy</h3>
            <p>This strategy does not do anything :) . It will send logs only after manual call
                to <i>logger.sendAllLogs();</i> method.</p>
            <pre className="code-snippet" dangerouslySetInnerHTML={{__html: html4}}/>

            <h3>Custom implementation of strategy</h3>
            <p><i>@TODO</i></p>
        </div>
    </article>
);

const snippet1 = `
const {strategy} = require("advanced-logger");
const strategy = new strategy.InstantStrategy();`;

const snippet2 = `
const {strategy} = require("advanced-logger");
const config = {
    maxBundle: 123
};
const strategy = new strategy.OnBundleSizeStrategy(config);`;

const snippet3 = `
const {strategy} = require("advanced-logger");
    const config = {
    interval: 10000
};
const strategy = new strategy.OnIntervalStrategy(config);`;

const snippet4 = `
const {strategy} = require("advanced-logger");

const strategy = new strategy.OnRequestStrategy();

//"logger" is an instance of AdvancedLogger
logger.sendAllLogs();`;

const html1 = highlight(snippet1, languages.javascript);
const html2 = highlight(snippet2, languages.javascript);
const html3 = highlight(snippet3, languages.javascript);
const html4 = highlight(snippet4, languages.javascript);
