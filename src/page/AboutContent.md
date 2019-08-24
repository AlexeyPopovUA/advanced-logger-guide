## The idea

This is an isomorphic log sending tool, that can be extended by internal/external plugins.

It has strategies ("when to send logs") and services ("where to send logs") and can be extended with custom implementations.

You can send JSONs or formatted strings as logs. Custom record formatter can be used.
 
It does not force conventions like using pre-defined record fields "logSeverity", "ErrorId" or "message".

## Features

* It works in browsers and nodejs
* It is able to send single logs and bundles of them to an external logger
* It supports different log sending strategies:
  1.  interval (for example, every 10 seconds)
  2.  on request (only when you ask)
  3.  mixed ("interval" + "on request") (will be done soon)
  4.  on bundle size (for example, sends bundles of 100 logs)
  5.  instant (received 1 log -> sent 1 log)
* It is able to group duplicated logs in certain time interval (for rapid firing of the same log messages)
* It is not afraid of circular links in log objects
* It supports custom format for logs (custom serializer)
* It supports different remote logger endpoints (SumoLogic, Loggly and Elasticsearch). Who is the next? ᕙ(ಠ.ಠ)ᕗ

## Runtime environment support

Builds are generated as ES5 bundles for nodejs and browser environments.

NodeJS - tested on latest lts

Browser - all latest browsers + IE10, IE11 (fetch polyfill)