# advanced-logger

[![Build Status](https://travis-ci.org/AlexeyPopovUA/advanced-logger.svg?branch=master)](https://travis-ci.org/AlexeyPopovUA/advanced-logger)
[![npm version](https://badge.fury.io/js/advanced-logger.svg)](https://badge.fury.io/js/advanced-logger)
[![dependencies Status](https://david-dm.org/AlexeyPopovUA/advanced-logger/status.svg)](https://david-dm.org/AlexeyPopovUA/advanced-logger)
[![install size](https://packagephobia.now.sh/badge?p=advanced-logger)](https://packagephobia.now.sh/result?p=advanced-logger)
[![](https://data.jsdelivr.com/v1/package/npm/advanced-logger/badge)](https://www.jsdelivr.com/package/npm/advanced-logger)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FAlexeyPopovUA%2Fadvanced-logger.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FAlexeyPopovUA%2Fadvanced-logger?ref=badge_shield)

[![Quality Gate](https://sonarcloud.io/api/project_badges/measure?project=advanced-logger&metric=alert_status)](https://sonarcloud.io/dashboard/index/advanced-logger)
[![Reliability](https://sonarcloud.io/api/project_badges/measure?project=advanced-logger&metric=reliability_rating)](https://sonarcloud.io/dashboard/index/advanced-logger)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=advanced-logger&metric=coverage)](https://sonarcloud.io/dashboard/index/advanced-logger)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=advanced-logger&metric=bugs)](https://sonarcloud.io/dashboard/index/advanced-logger)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=advanced-logger&metric=code_smells)](https://sonarcloud.io/dashboard/index/advanced-logger)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=advanced-logger&metric=vulnerabilities)](https://sonarcloud.io/dashboard/index/advanced-logger)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

## The idea

The main idea of this module is to create an isomorphic log sending tool, that can be extended by internal/external plugins.

It has bundles for browser and nodejs environments.

It can be extended with custom strategy ("when to send logs") and service ("where to send logs"). See usage examples.

It does not restrict you with conventions, for example, existence of "logSeverity", "ErrorId" or "message" fields in log.

It supports any format of logs via custom serializer.

## Features

* It works in browsers and nodejs
* It is able to send single logs and bundles of them to an external logger
* It supports different log sending strategies:
  1.  interval (for example, every 10 seconds)
  2.  on request (only when you ask)
  3.  mixed ("interval" + "on request") (will be done soon)
  4.  on bundle size (for example, sends bundles of 100 logs)
  5.  instant (received 1 log -> sent 1 log)
* It is able to group duplicated logs in certain time interval (for rapid fire of the same logs)
* It is not afraid of circular links in log objects
* It supports custom format for logs (custom serializer)
* It supports different remote logger endpoints (SumoLogic, Loggly and Elasticsearch). Who is the next? ᕙ(ಠ.ಠ)ᕗ

## Runtime environment support

Builds are generated as ES5 bundles for nodejs and browser environments.

NodeJS - tested on latest lts

Browser - all latest browsers + IE10, IE11 (fetch polyfill)

## Usage

Please, find working examples for browser and nodejs environments in **/example** folder.

### Add to the project

In browser:

```html
<script src="./node-modules/advance-logger/dist/browser/advanced-logger.browser.min.js"></script>
```

or

```html
<script src="https://cdn.jsdelivr.net/npm/advanced-logger@latest/dist/browser/advanced-logger.browser.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/advanced-logger@latest/dist/browser-debug/advanced-logger.browser.js"></script>
```

In nodejs:

``` js
const {AdvancedLogger, service, strategy} = require('advanced-logger');
```

### Simplest usage

Lets initiate a logger that sends all logs instantly to Sumologic service.

In browser

```js
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
logger.log({test: "instant log u3"});
```

### Strategies

Strategies are components that "know" when is it right time to send logs.

There are next strategies available:

* InstantStrategy
* OnBundleSizeStrategy
* OnIntervalStrategy
* OnRequestStrategy

#### InstantStrategy

Does not require parameters. It just sends the log as soon as it appears in logger.

```js
const {strategy} = require("advanced-logger");
const strategy = new strategy.InstantStrategy();
```