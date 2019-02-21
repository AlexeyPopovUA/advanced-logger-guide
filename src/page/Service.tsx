import * as React from "react";
import * as Prism from "prismjs";

export default class Service extends React.Component {
    public render() {
        return (
            <article className="page-content page-service">
                <h1 className="w3-text-teal">Services</h1>
                <div className="page-content">
                    <h2>Sumologic (see <a href="https://www.sumologic.com">Sumologic</a> )</h2>
                    <pre className="code-snippet" dangerouslySetInnerHTML={{__html: html1}}/>

                    <h2>Loggly (see <a href="https://www.loggly.com">Loggly</a>)</h2>
                    <pre className="code-snippet" dangerouslySetInnerHTML={{__html: html2}}/>

                    <h2>Elastic Search Service (see <a href="https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/es-gsg-upload-data.html">Elastic Search at AWS</a>)</h2>
                    <p>Logger supports sending data to Elasticsearch service endpoint. It was tested on AWS-based instance of Elasticsearch and Kibana. Ideally, it should work also on instance of any other cloud provider.</p>
                    <pre className="code-snippet" dangerouslySetInnerHTML={{__html: html3}}/>

                    <h2>Custom implementation of service</h2>
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
    // this should be the url for bulk log sending
    url: "{bulk report url}",
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

const code3 = `
//Configuration for communication with Elastic Search.
//Url should be taken from the logger's source category configuration page.
const serviceConfig = {
    // this should be the url for **bulk** log sending
    url: "https://<endpoint_url>/_bulk",
    method: "POST",
    //this field will be used to send index value in meta information for each log
    logMetaIndexField: "IndexField"
};

//Default log configuration.
//It is used like a template with default values for each new log.
//Can be of any structure. It will be shallowly copied during creation of a new log record.
const defaultLogConfig = {
    BuildVersion: 123,
    Platform: "browser",
    Severity: "DEBUG",
    Data: "",
    Timestamp: "",
    Message: "",
    IndexField: "web-app"
};

//general config
const config = {serviceConfig, defaultLogConfig};

const service = new service.ElasticsearchService(config);`;

const html1 = Prism.highlight(code1, Prism.languages.javascript);
const html2 = Prism.highlight(code2, Prism.languages.javascript);
const html3 = Prism.highlight(code3, Prism.languages.javascript);
