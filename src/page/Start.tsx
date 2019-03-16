import React from "react";
import {highlight, languages} from "prismjs";

export default () => (
    <article className="page-content page-start">
        <h1 className="w3-text-teal">Getting started</h1>
        <div className="page-content">
            <h2>Add to the project</h2>
            <p>In browser:</p>
            <pre className="code-snippet" dangerouslySetInnerHTML={{__html: html1}}/>
            <p>or</p>
            <pre className="code-snippet" dangerouslySetInnerHTML={{__html: html2}}/>
            <p>In nodejs:</p>
            <pre className="code-snippet" dangerouslySetInnerHTML={{__html: html3}}/>

            <h2>Simplest usage</h2>
            <p>Lets initiate a logger that sends all logs instantly to Sumologic service.</p>
            <pre className="code-snippet" dangerouslySetInnerHTML={{__html: html4}}/>
        </div>
    </article>
);

const code1 = `<script src="./node-modules/advance-logger/dist/browser/advanced-logger.browser.min.js"> </script>`;
const code2 = `<script src="https://cdn.jsdelivr.net/npm/advanced-logger@latest/dist/browser/advanced-logger.browser.min.js"> </script>
<script src="https://cdn.jsdelivr.net/npm/advanced-logger@latest/dist/browser-debug/advanced-logger.browser.js"> </script>`;
const code3 = `const {AdvancedLogger, service, strategy} = require('advanced-logger');`;
const code4 = `
const {AdvancedLogger, service, strategy} = window.advancedLogger;

const defaultLogConfig = {
    UserAgent: window.userAgent,
    Channel: "my-company",
    BuildVersion: 123,
    Platform: "browser",
    Severity: "DEBUG",
    Data: "",
    Timestamp: "",
    Message: "",
    Category: ""
};

const serviceConfig = {
    url: "https://www.google.nl",
    sourceName: "advancedLoggerTest",
    host: "advanced-logger",
    sourceCategory: "MY/SUMO/namespace",
    method: "POST"
};

const config = {serviceConfig, defaultLogConfig};

const logger = new AdvancedLogger({
    service: new service.SumologicService(config),
    strategy: new strategy.InstantStrategy()
});

logger.log({test: "instant log u1"});
logger.log({test: "instant log u2"});
logger.log({test: "instant log u3"});`;

const html1 = highlight(code1, languages.html);
const html2 = highlight(code2, languages.html);
const html3 = highlight(code3, languages.javascript);
const html4 = highlight(code4, languages.javascript);
