import * as React from "react";
import * as Prism from "prismjs";

export default class Start extends React.Component {
    public render() {
        return (
            <article className="page-content page-start">
                <h1 className="w3-text-teal">Getting started</h1>
                <div className="page-content">
                    <p>Lets initiate a logger that sends all logs instantly to Sumologic service.</p>

                    <h3>In nodejs:</h3>
                    <pre className="code-snippet" dangerouslySetInnerHTML={{__html: html1}}/>

                    <h3>In browser:</h3>
                    <pre className="code-snippet" dangerouslySetInnerHTML={{__html: html2}}/>
                </div>
            </article>
        );
    }
}

const code1 = `const {AdvancedLogger, service, strategy} = require('advanced-logger');`;
const code2 = `
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

const html1 = Prism.highlight(code1, Prism.languages.javascript);
const html2 = Prism.highlight(code2, Prism.languages.javascript);
