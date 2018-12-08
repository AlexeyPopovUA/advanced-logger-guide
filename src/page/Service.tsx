import * as React from "react";
import * as Prism from "prismjs";

export default class Service extends React.Component {
    public render() {
        return (
            <article className="page-content page-service">
                <h1 className="w3-text-teal">Services</h1>
                <div className="page-content">
                    <p>Currently, module supports only Sumologic and Loggly services out of the box.</p>

                    <h3>Sumologic (see https://www.sumologic.com/)</h3>
                    <pre className="code-snippet" dangerouslySetInnerHTML={{__html: html1}}/>

                    <h3>Loggly (see https://www.loggly.com/)</h3>
                    <pre className="code-snippet" dangerouslySetInnerHTML={{__html: html2}}/>

                    <h3>Custom implementation of service</h3>
                    <p>@TODO</p>
                </div>
            </article>
        );
    }
}

const code1 = `
//Configuration for communication with Sumologic. Url should be taken from the logger's source category configuration page.
const serviceConfig = {
    url: "https://www.google.nl",
    sourceName: "advancedLoggerTest",
    host: "advanced-logger",
    sourceCategory: "MY/SUMO/namespace",
    method: "POST"
};

//Default log configuration.
//It is used like a template with default values for each new log.
//Can be of any structure. It will be shallowly copied during creation of a new log record.
const defaultLogConfig = {
    UserAgent: window.userAgent,
    BuildVersion: 123,
    Platform: "browser",
    Severity: "DEBUG",
    Data: "",
    Timestamp: "",
    Message: "",
    Category: ""
};

//general config
const config = {serviceConfig, defaultLogConfig};
const service = new service.SumologicService(config);`;

const code2 = `
//Configuration for communication with Sumologic. Url should be taken from the logger's source category configuration page.
const serviceConfig = {
    // this should be the url for <strong>bulk<strong> log sending
    "url": "https://{loggly_url}/bulk/{token}>/tag/bulk/",
    method: "POST"
};

//Default log configuration.
//It is used like a template with default values for each new log.
//Can be of any structure. It will be shallowly copied during creation of a new log record.
const defaultLogConfig = {
    UserAgent: window.userAgent,
    BuildVersion: 123,
    Platform: "browser",
    Severity: "DEBUG",
    Data: "",
    Timestamp: "",
    Message: "",
    Category: ""
};

//general config
const config = {serviceConfig, defaultLogConfig};
const service = new service.LogglyService(config);`;

const html1 = Prism.highlight(code1, Prism.languages.javascript);
const html2 = Prism.highlight(code2, Prism.languages.javascript);