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